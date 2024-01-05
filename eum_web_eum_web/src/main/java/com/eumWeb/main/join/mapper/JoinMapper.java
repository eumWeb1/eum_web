package com.eumWeb.main.join.mapper;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface JoinMapper {
	
	/**
	 * 이메일 중복 검사
	 * @param userEmail
	 * @return
	 */
	int countByEmail(String userEmail);
	/**
	 * 휴대폰번호 중복 검사
	 * @param phone
	 * @return
	 */
	int countByPhone(String phone);
	
	/**
	 * 회원가입
	 * @param userName
	 * @param userBirth
	 * @param userAdd1
	 * @param userAdd2
	 * @param userAdd3
	 * @param userEmail
	 * @param encodedPassword
	 * @param userPhone
	 * @param userGrade
	 * @return
	 */
	void getSignDate(String userName, String userBirth, String userAdd1, String userAdd2, String userAdd3,
			String userEmail, String encodedPassword, String userPhone, int userGrade);


}
