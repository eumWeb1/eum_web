<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 폼</title>
<!-- css  -->
<link rel="stylesheet" href="/css/login/login.css">
<!-- js -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="/js/login/login.js?ver=20231222"></script>
<script type="text/javascript" src="/js/join/join.js?ver=20231226"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

</head>
<body>
	<div class="wrapper">
		<div class="container">
			<!-- 회원가입 폼-->
			<div class="sign-up-container">
				<div class="form">
					<input type="hidden" name="hiddenName" id="hiddenName">
					
					<input type="hidden" name="hiddenBirth" id="hiddenBirth">
					
					<input type="hidden" name="postcode" id="postcode">
					
					<input id="userEmail" type="text" placeholder="이메일 아이디">
					<span id="email_error" class="txt"></span>
					
					<input id="password" type="password" placeholder="비밀번호">
					<span id="password_error" class="txt"></span>
					
					<input id="password_check" type="password" placeholder="비밀번호 확인">
					<span id="password_check_error" class="txt"></span>
					
					<input id="phoneForm" placeholder="전화번호" maxlength="0">
					<span id="phoneForm_error" class="txt"></span>
					
					<input type="text" id="address" placeholder="주소" name="address" maxlength="0">
					<span id="address_error" class="txt"></span>
					
					<input type="text" id="detailAddress" placeholder="상세주소">
					<!-- 드롭다운 -->
					<select class="authority" id="lang">
						<option value="">권한을 선택하세요</option>
						<option value="10">직원</option>
						<option value="20">협력사</option>
						<option value="30">관리자</option>
					</select> <a id="lang_error" class="txt"></a>

					<button id="signupButton" class="form_btn" disabled="disabled">가입하기</button>
				</div>

				<!-- 본인인증 모달 -->
				<div id="identityVerificationModal" style="display: none;">
					<div class="modal-content">
						<span class="close">&times;</span>
						<p>본인인증</p>
						<div class="content">
							<input id="userName" type="text" placeholder="성함">
							<span id="name_error" class="txt"></span>
							
							<input id="birth" type="text" placeholder="생년월일" maxlength="13">
							<span id="birth_error" class="txt"></span>
							
							<input id="phone" type="tel" placeholder="전화번호 '-' 뺴고입력" maxlength="11">
							<span id="phone_error" class="txt"></span>
							
							<button id="sendPhoneButton" class="form_btn" disabled>인증번호 전송</button>

							<input id="authentication_number" type="tel" placeholder="인증번호">
							<span id="authentication_number_error" class="txt"></span>

							<button id="ok_button" class="form_btn" disabled="disabled" style="padding: 15px 70px;">확인</button>

						</div>
					</div>
				</div>
				<!--   -->
			</div>
			<!-- 로그인 폼  -->
			<div class="sign-in-container">
				<form action="/login.dox" method="post" id="loginForm" style="height: 100%;">
					<h1>로그인</h1>
			<% if (request.getAttribute("error") != null) { %>
			    <div id="alert-danger" class="alert alert-danger txt"><%= request.getAttribute("error") %></div>
			<% } %>
					<input id="loginEmail" name="userEmail" type="email" placeholder="Email">
					<span id="loginEmail_error" class="txt"></span>
					<input id="loginPassword" name="userPw" type="password" placeholder="Password">
					<span id="loginPassword_error" class="txt"></span>
					<button type="submit" id="loginBtn" class="form_btn">로그인</button>
				</form>
			</div>
			<div class="overlay-container">
				<div class="overlay-left">
					<h1>계정 만들기</h1>
					<p>우리와 계속 연락하려면 개인 정보로 로그인하십시오</p>
					<button id="signIn" class="overlay_btn">로그인</button>
				</div>
				<div class="overlay-right">
					<h1>이음 IT</h1>
					<p>개인 정보를 입력하고 우리와 함께 여행을 시작하세요</p>
					<button id="signUp" class="overlay_btn">가입하기</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>