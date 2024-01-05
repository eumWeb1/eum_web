package com.eumWeb.main.login.vo;

import java.util.Date;

public class LoginVo {
	
	private int userNo;
	private String userName;
	private String userEmail;
	private String userPw;
	private String userPhone;
	private int userGrade;
	private Date correctionDate;
	private Date deletionDate;
	private String userBirth;
	private String userAdd1;
	private String userAdd2;
	private String userAdd3;
	
	
	public LoginVo() {
		// TODO Auto-generated constructor stub
	}


	public LoginVo(int userNo, String userName, String userEmail, String userPw, String userPhone, int userGrade,
			Date correctionDate, Date deletionDate, String userBirth, String userAdd1, String userAdd2,
			String userAdd3) {
		super();
		this.userNo = userNo;
		this.userName = userName;
		this.userEmail = userEmail;
		this.userPw = userPw;
		this.userPhone = userPhone;
		this.userGrade = userGrade;
		this.correctionDate = correctionDate;
		this.deletionDate = deletionDate;
		this.userBirth = userBirth;
		this.userAdd1 = userAdd1;
		this.userAdd2 = userAdd2;
		this.userAdd3 = userAdd3;
	}


	public int getUserNo() {
		return userNo;
	}


	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getUserEmail() {
		return userEmail;
	}


	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}


	public String getUserPw() {
		return userPw;
	}


	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}


	public String getUserPhone() {
		return userPhone;
	}


	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}


	public int getUserGrade() {
		return userGrade;
	}


	public void setUserGrade(int userGrade) {
		this.userGrade = userGrade;
	}


	public Date getCorrectionDate() {
		return correctionDate;
	}


	public void setCorrectionDate(Date correctionDate) {
		this.correctionDate = correctionDate;
	}


	public Date getDeletionDate() {
		return deletionDate;
	}


	public void setDeletionDate(Date deletionDate) {
		this.deletionDate = deletionDate;
	}


	public String getUserBirth() {
		return userBirth;
	}


	public void setUserBirth(String userBirth) {
		this.userBirth = userBirth;
	}


	public String getUserAdd1() {
		return userAdd1;
	}


	public void setUserAdd1(String userAdd1) {
		this.userAdd1 = userAdd1;
	}


	public String getUserAdd2() {
		return userAdd2;
	}


	public void setUserAdd2(String userAdd2) {
		this.userAdd2 = userAdd2;
	}


	public String getUserAdd3() {
		return userAdd3;
	}


	public void setUserAdd3(String userAdd3) {
		this.userAdd3 = userAdd3;
	}


	@Override
	public String toString() {
		return "LoginVo [userNo=" + userNo + ", userName=" + userName + ", userEmail=" + userEmail + ", userPw="
				+ userPw + ", userPhone=" + userPhone + ", userGrade=" + userGrade + ", correctionDate="
				+ correctionDate + ", deletionDate=" + deletionDate + ", userBirth=" + userBirth + ", userAdd1="
				+ userAdd1 + ", userAdd2=" + userAdd2 + ", userAdd3=" + userAdd3 + "]";
	}
	
	
	
	
	

}
