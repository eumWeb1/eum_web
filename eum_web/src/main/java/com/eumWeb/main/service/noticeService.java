package com.eumWeb.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eumWeb.main.mapper.noticeMapper;

@Service
public class noticeService {
	
	@Autowired
	private noticeMapper noticeMapper;
	
	public String noticePage() {
		return noticeMapper.noticePage();
	}
	
	public String oneNoticePage() {
		return noticeMapper.oneNoticePage();
	}
}
