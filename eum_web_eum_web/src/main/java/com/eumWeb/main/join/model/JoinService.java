package com.eumWeb.main.join.model;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eumWeb.main.join.mapper.JoinMapper;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class JoinService {

	@Autowired
	JoinMapper joinMapper;

	@Autowired
	PasswordEncoder passwordEncoder;

	public boolean checkEmailForDuplicate(String userEmail) {
		// MyBatis 매퍼를 사용하여 데이터베이스에서 이메일을 조회합니다.
		int count = joinMapper.countByEmail(userEmail);

		// 이메일이 데이터베이스에 이미 존재하는지 확인합니다.
		// count가 0보다 크면, 이메일이 중복된 것입니다.
		return count > 0;
	}

	public boolean phoneCheckForDuplicate(String phone) {
		int count = joinMapper.countByPhone(phone);
		return count > 0;
	}

	// 휴대폰 인증
	public void certifiedPhoneNumber(String phone, String cerNum) {

		String api_key = "NCS5A6B7M9WDC6RT";
		String api_secret = "YW943QDUWRVTNLZMUQ5VV1HSQW1M7ZYK";
		Message coolsms = new Message(api_key, api_secret);

		// 4 params(to, from, type, text) are mandatory. must be filled
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("to", phone); // 수신전화번호
		params.put("from", phone); // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
		params.put("type", "SMS");
		params.put("text", "이음 IT 인증번호는" + "[" + cerNum + "]" + "입니다.");
		params.put("app_version", "test app 1.2"); // application name and version

		try {
			JSONObject obj = (JSONObject) coolsms.send(params);
			System.out.println(obj.toString());
		} catch (CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}

	}

	// 회원 가입
	public void getSignDate(String userName, String userBirth, String userAdd1, String userAdd2, String userAdd3,
			String userEmail, String userPw, String userPhone, int userGrade) {

		// 비밀번호 암호화
		String encodedPassword = passwordEncoder.encode(userPw);

		joinMapper.getSignDate(userName,userBirth,userAdd1,userAdd2,userAdd3,userEmail,encodedPassword,userPhone,userGrade);
	}

}
