package com.eumWeb.main.login.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eumWeb.main.login.mapper.LoginMapper;
import com.eumWeb.main.login.vo.LoginVo;

@Service
public class LoginService {

	@Autowired
	LoginMapper loginMapper;
	
	@Autowired
    PasswordEncoder passwordEncoder;

	public LoginVo authenticateUser(String userEmail, String userPw) {
		 LoginVo userInfo = loginMapper.findByUserId(userEmail);
	        if (userInfo != null && passwordEncoder.matches(userPw, userInfo.getUserPw())) {
	            return userInfo; // 인증 성공
	            
	        }

	        return null; // 인증 실패
	    }
	  
}
