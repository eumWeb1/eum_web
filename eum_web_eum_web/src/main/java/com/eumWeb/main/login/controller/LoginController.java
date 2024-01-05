package com.eumWeb.main.login.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.eumWeb.main.login.model.LoginService;
import com.eumWeb.main.login.vo.LoginVo;

@Controller
public class LoginController {

	@Autowired
	LoginService loginService;

	@Autowired
	HttpSession session;

	@GetMapping("login.do")
	public String loginform() {
		return "/login/login";
	}

	@PostMapping("/login.dox")
	public String handleLogin(RedirectAttributes redirectAttributes, @RequestParam String userEmail, @RequestParam String userPw, Model model) {

		System.out.println("userEmail : " + userEmail);
		System.out.println("userPw : " + userPw);

		LoginVo userInfo = loginService.authenticateUser(userEmail, userPw);
		System.out.println("userInfo : " + userInfo);
		if (userInfo != null) {
			session.setAttribute("userInfo", userInfo);
			model.addAttribute("userInfo", userInfo);
			return "redirect:/main.do"; // 성공 시 리디렉션
		} else {
			// ID나 비밀번호가 일치하지 않을 때 오류 메시지 설정
			 redirectAttributes.addFlashAttribute("error", "사용자 정보가 잘못되었거나 존재하지 않습니다."); 
			return "redirect:/login.do"; // 실패 시 리디렉션
		}
	}

}