package com.eumWeb.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.eumWeb.main.service.noticeService;

@Controller
public class noticeController {
	
	@Autowired
	private noticeService noticeService;
	
	@GetMapping("")
	public String noticePage() {
		noticeService.noticePage();
		return "noticePage";
	}

	@GetMapping("/oneNoticePage")
	public String oneNoticePage() {
		return "/oneNoticePage";
		//asdasd
	}
}
