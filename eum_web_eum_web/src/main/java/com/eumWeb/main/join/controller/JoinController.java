package com.eumWeb.main.join.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eumWeb.main.join.model.JoinService;

@Controller
public class JoinController {

	@Autowired
	JoinService joinService;
	
	
	@PostMapping("/emailCheck")
	@ResponseBody
	public boolean emailCheck(@RequestParam String userEmail) {
		// System.out.println("userEmail : " + userEmail);
		boolean isDuplicate = joinService.checkEmailForDuplicate(userEmail);
		// System.out.println("isDuplicate : " + isDuplicate);
		// 결과를 반환합니다(중복이면 true, 그렇지 않으면 false).
		return isDuplicate;

	}
	
	@PostMapping("/phoneCheck")
	@ResponseBody
	public boolean phoneCheck(String phone) {
		//System.out.println("phone : " + phone);
		boolean isDuplicate = joinService.phoneCheckForDuplicate(phone);
		//System.out.println("isDuplicate : " + isDuplicate);
		return isDuplicate;
	}

	
	// 휴대폰 인증
	@PostMapping("/sendPhoneNumber")
	@ResponseBody
	public String sendPhoneNumber(@RequestParam String phone, Model model) {

		System.out.println("핸드폰 번호 : " + phone);

		Random rand = new Random();
		String numStr = "";
		for (int i = 0; i < 6; i++) {
			String ran = Integer.toString(rand.nextInt(10));
			numStr += ran;
		}
		model.addAttribute("numStr", numStr);

		joinService.certifiedPhoneNumber(phone, numStr);
		return numStr;
	}
	
	// 회원가입 실행
	@PostMapping("/signup")
	public String signup(@RequestParam("hiddenName") String userName,
			@RequestParam("hiddenBirth") String userBirth,
			@RequestParam("postcode") String userAdd1,@RequestParam("address") String userAdd2,
			@RequestParam("detailAddress") String userAdd3, String userEmail,
			@RequestParam("password") String userPw, @RequestParam("phoneForm") String userPhone,
			@RequestParam("lang") int userGrade ) {
			
			System.out.println("userName : " + userName);
			System.out.println("userBirth : " + userBirth);
			System.out.println("userAdd1 : " + userAdd1);
			System.out.println("userAdd2 : " + userAdd2);
			System.out.println("userAdd3 : " + userAdd3);
			System.out.println("userEmail : " + userEmail);
			System.out.println("userPw : " + userPw);
			System.out.println("userPhone : " + userPhone);
			System.out.println("userGrade : " + userGrade);
			
			// 회원가입
			joinService.getSignDate(userName,userBirth,userAdd1,userAdd2,userAdd3,userEmail,userPw,userPhone,userGrade);
			
			
			return "redirect:/login.do";
	}
	
	
	
	
}
