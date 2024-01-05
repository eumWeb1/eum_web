package com.eumWeb.main.login.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.eumWeb.main.login.vo.LoginVo;

@Mapper
public interface LoginMapper {

	LoginVo findByUserId(String userEmail);

}
