$(document).ready(function() {
	console.log("로그인 js 호출");

	$("#signUp").click(function() {
		$(".container").addClass("right-panel-active");
	});

	$("#signIn").click(function() {
		$(".container").removeClass("right-panel-active");
	});

	$('#loginEmail, #loginPassword').on('input', function() {
		$('#alert-danger').text(''); 
	});


	// 로그인 버튼 클릭 이벤트
	$('#loginBtn').click(function(e) {
		e.preventDefault(); // 폼의 기본 제출 방지

		var email = $('#loginEmail').val();
		var password = $('#loginPassword').val();

		// 오류 메시지 초기화
		$('#loginEmail_error').text('');
		$('#loginPassword_error').text(''); // 오타 수정

		var isValid = true;

		// 이메일 유효성 검사
		if (email == '') {
			$('#loginEmail_error').text('이메일을 입력해 주세요.');
			isValid = false;
		} else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
			$('#loginEmail_error').text('유효한 이메일 주소를 입력해 주세요.');
			isValid = false;
		}

		// 비밀번호 유효성 검사
		if (password == '') {
			$('#loginPassword_error').text('비밀번호를 입력해 주세요.'); // 오타 수정
			isValid = false;
		} else if (password.length < 6) {
			$('#loginPassword_error').text('비밀번호는 최소 6자 이상이어야 합니다.'); // 오타 수정
			isValid = false;
		} else if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
			$('#loginPassword_error').text('비밀번호에는 적어도 하나의 특수 문자가 포함되어야 합니다.'); // 오타 수정
			isValid = false;
		}

		// 유효하다면 폼 제출
		if (isValid) {
			$('#loginForm').submit();
		}
	});


})

