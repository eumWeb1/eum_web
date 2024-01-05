$(document).ready(function() {
	console.log("회원가입 js 호출");


	// 주소 클릭,포커스 이동 이벤트
	$('#address').on('click', execDaumPostcode);

	// 이메일 유효성 검사
	$('#userEmail').on('input', validationEmail);

	// 비밀번호 유효성 검사
	$('#password, #password_check').on('input', validatePassword);


	// 전화 입력이 클릭될 때
	$('#phoneForm').on('click focus', function() {
		// 신원 확인 모달 표시
		$('#identityVerificationModal').show();
		$('#userName').focus();

	});

	// 사용자가 (x) 버튼을 클릭하면 모달 닫기
	$('.close').on('click', function() {
		$('#identityVerificationModal').hide();

	});

	$(window).on('click', function(event) {
		var modal = $('#identityVerificationModal');
		if (event.target == modal[0]) {
			$('#phoneForm_error').text('');
			modal.hide();
		}
	});

	//사용자 성함 유효성 검사
	$('#userName').on('input', validateUserName);

	// 생년월일 유효성 검사
	$('#birth').on('input', validateBirthDate);

	// 전화번호 유효성 검사
	$('#phone').on('input', validateAndCheckPhoneNumber);

	// 인증번호 전송 클릭 이벤트
	$('#sendPhoneButton').on('click', sendPhone);

	//인증번호 유효성 검사	
	$('#authentication_number').on('input', validateAuthNumber);

	//확인 버튼 클릭 이벤트
	$('#ok_button').on('click', userNameBirthPhone);

	//주소 유효성 검사 
	$('#address').on('input', validateAddress);

	//권한선택 드롭다운 클릭 선택 이벤트
	$('#lang').on('change', validateDropdown);


	//가입하기 버튼 클리기 시 이벤트
	$('#signupButton').on('click', getSignDate)


}) //end

//가입하기 클릭 시 보낼 데이터 함수
function getSignDate() {
	// 각 입력 필드의 값을 변수에 저장
	var hiddenName = $('#hiddenName').val();
	var hiddenBirth = $('#hiddenBirth').val();
	var postcode = $('#postcode').val();
	var userEmail = $('#userEmail').val();
	var password = $('#password').val();
	var passwordCheck = $('#password_check').val();
	var phoneForm = $('#phoneForm').val();
	var address = $('#address').val();
	var detailAddress = $('#detailAddress').val();
	var lang = $('#lang').val();

	console.log("hiddenName" + hiddenName);
	console.log("hiddenBirth" + hiddenBirth);
	console.log("postcode" + postcode);
	console.log("userEmail" + userEmail);
	console.log("password" + password);
	console.log("passwordCheck" + passwordCheck);
	console.log("phoneForm" + phoneForm);
	console.log("address" + address);
	console.log("detailAddress" + detailAddress);
	console.log("lang" + lang);

	// Ajax 요청 설정
	$.ajax({
		url: '/signup',
		type: 'post',
		data: {
			// 서버로 보낼 데이터
			hiddenName: hiddenName,
			hiddenBirth: hiddenBirth,
			postcode: postcode,
			userEmail: userEmail,
			password: password,
			passwordCheck: passwordCheck,
			phoneForm: phoneForm,
			address: address,
			detailAddress: detailAddress,
			lang: lang
		},
		success: function(response) {
			// 요청이 성공했을 때 실행할 함수
			console.log('서버로부터 응답: ', response);
			// 성공 로직 처리
			location.reload();
		},
		error: function(xhr, status, error) {
			// 요청이 실패했을 때 실행할 함수
			console.error('에러 발생: ', error);
			// 오류 처리 로직
		}
	});


}
//가입 버튼 상태 업데이트
var mainValidationStatus = {
	userEmail: false,
	password: false,
	address: false,
	phoneForm: false,
	lang: false
};

// 가입버튼활성화 함수 
function updateSignupButtonState() {
	//console.log("이메일 : " + mainValidationStatus.userEmail + "패스워드 : " + mainValidationStatus.password +
	//"주소 : " + mainValidationStatus.address + "휴대폰 : " + mainValidationStatus.phoneForm + "권한 : " + mainValidationStatus.lang);
	if (mainValidationStatus.userEmail && mainValidationStatus.password &&
		mainValidationStatus.address && mainValidationStatus.phoneForm && mainValidationStatus.lang) {
		/*console.log("이메일 : " + mainValidationStatus.userEmail + "패스워드 : " + mainValidationStatus.password +
			"주소 : " + mainValidationStatus.address + "휴대폰 : " + mainValidationStatus.phoneForm + "권한 : " + mainValidationStatus.lang);*/
		//console.log('가입 버튼 활성화');
		$('#signupButton').removeAttr('disabled');
	} else {
		//console.log('가입 버튼 비활성화');
		/*console.log("이메일 : " + mainValidationStatus.userEmail + "패스워드 : " + mainValidationStatus.password +
			"주소 : " + mainValidationStatus.address + "휴대폰 : " + mainValidationStatus.phoneForm + "권한 : " + mainValidationStatus.lang);*/
		$('#signupButton').attr('disabled', 'disabled');
	}
}




// 드롭다운 선택 유효성 검사 함수
function validateDropdown() {
	var selectedValue = $('#lang').val();
	var langError = $('#lang_error');

	// 이전 오류 메시지 지우기
	langError.text('');

	if (!selectedValue) {
		// 기본 "권한 선택" 옵션이 여전히 선택된 경우 (값이 비어있음)
		langError.text('권한을 선택해주세요.');
		mainValidationStatus.lang = false;
	} else {
		mainValidationStatus.lang = true;
	}
	updateSignupButtonState();
}
// 휴대폰 유효성 검사 함수
function phoneForm() {
	var phoneForm = $('#phoneForm').val();
	var phoneForm_error = $('#phoneForm_error');

	// 이전 오류 메시지 지우기
	phoneForm_error.text('');
	// 휴대폰 번호가 비어 있는지 확인
	if (!phoneForm.trim()) {
		phoneForm_error.text('주소를 입력해주세요.');
		mainValidationStatus.phoneForm = false;
		updateSignupButtonState();
		return false;
	}


	// 모든 검사 통과
	mainValidationStatus.phoneForm = true;
	updateSignupButtonState();
	return true;
}


// 주소 유효성 검사 함수
function validateAddress() {
	var address = $('#address').val();
	var addressError = $('#address_error');

	// 이전 오류 메시지 지우기
	addressError.text('');

	// 주소가 비어 있는지 확인
	if (!address.trim()) {
		addressError.text('주소를 입력해주세요.');
		mainValidationStatus.address = false;
		updateSignupButtonState();
		return false;
	}
	// 모든 검사 통과
	mainValidationStatus.address = true;
	updateSignupButtonState();
	return true;
}

// 이름,생년월일,전화번호
function userNameBirthPhone() {

	//입력값 변수에 저장
	var userName = $('#userName').val();
	var birth = $('#birth').val();
	var phone = $('#phone').val();

	//모달에서 입력한 값 인풋에 담기
	$('#hiddenName').val(userName);
	$('#hiddenBirth').val(birth);
	$('#phoneForm').val(phone);
	mainValidationStatus.phoneForm = true;
	mainValidationStatus.address = true;
	updateSignupButtonState();

	//모달창 닫기
	$('#identityVerificationModal').hide();
}



// 모달에 확인버튼 활성화 함수
function validateAuthNumber() {
	var enteredAuthNumber = $('#authentication_number').val();
	var authNumberError = $('#authentication_number_error');

	// 이전 오류 메시지를 지웁니다
	authNumberError.text('');

	if (enteredAuthNumber === receivedAuthNumber) {
		// 입력된 번호가 받은 번호와 일치하면 "확인" 버튼을 활성화합니다
		$('#ok_button').removeAttr('disabled');
	} else {
		// 입력된 번호가 일치하지 않으면 오류 메시지를 표시하고 "확인" 버튼을 비활성화합니다
		authNumberError.text('입력한 인증번호가 일치하지 않습니다.');
		$('#ok_button').attr('disabled', 'disabled');
	}
}
var receivedAuthNumber = null;  // 서버로부터 받은 인증번호를 저장할 변수

//"인증번호 전송" 버튼 클릭 이벤트 함수
function sendPhone() {
	if (validationStatus.userName && validationStatus.birthDate && validationStatus.phoneNumber) {
		console.log('전화번호 전송 중...');
		$.ajax({
			url: '/sendPhoneNumber', // 실제 서버 엔드포인트로 교체하세요
			type: 'POST',
			data: {
				// 전송하고자 하는 데이터를 포함하세요, 예: 전화번호
				phone: $('#phone').val()
			},
			success: function(response) {
				console.log('인증번호가 성공적으로 전송되었습니다:', response);
				//alert('인증번호 : ' + response);
				receivedAuthNumber = response; // 받은 인증 본호 저장
				$('#authentication_number').val(response);
				validateAuthNumber();
			},
			error: function(error) {
				// 오류 처리 (예: 사용자에게 오류 메시지 표시)
				console.log('인증번호 전송 오류:', error);
			}
		});
	} else {
		console.log('모든 유효성 검사가 통과되지 않았습니다. 전화번호를 전송할 수 없습니다.');
	}

}


var validationStatus = {
	userName: false,
	birthDate: false,
	phoneNumber: false
};
//인증번호 버튼 활성화
function updateButtonState() {
	if (validationStatus.userName && validationStatus.birthDate && validationStatus.phoneNumber) {
		console.log("userName : " + validationStatus.userName + "," + "birthDate : " + validationStatus.birthDate + "," + "phoneNumber : " + validationStatus.phoneNumber);
		$('#sendPhoneButton').removeAttr('disabled');
	} else {
		$('#sendPhoneButton').attr('disabled', 'disabled');
	}
}


// 전화번호 유효성 검사 및 중복 확인 함수
function validateAndCheckPhoneNumber() {
	var phone = $('#phone').val();
	var phoneError = $('#phone_error');

	//console.log("원본 전화번호: " + phone);

	// 이전 오류 메시지 삭제
	phoneError.text('');

	// 숫자가 아닌 문자 제거
	var filteredNumber = phone.replace(/[^0-9]/g, '');
	//console.log("필터링된 전화번호: " + filteredNumber);

	// 정리된 전화번호를 입력 필드에 설정
	$('#phone').val(filteredNumber);

	// 전화번호 길이 확인
	if (filteredNumber.length != 11) {
		phoneError.text('전화번호는 11자리여야 합니다.').css('color', 'red');
		//console.log("Is length !== 11:", filteredNumber.length !== 11);
		validationStatus.phoneNumber = false;
		updateButtonState();
	} else {
		checkDuplicatePhone(filteredNumber);
	}
}

// 휴대폰 중복 검사
function checkDuplicatePhone(phoneNumber) {
	var phoneError = $('#phone_error');

	$.ajax({
		url: '/phoneCheck',
		type: 'POST',
		data: { phone: phoneNumber },
		success: function(response) {
			if (response.isDuplicate) {
				phoneError.text('전화번호는 11자리여야 합니다.').css('color', 'red');
				validationStatus.phoneNumber = false;
			} else {
				phoneError.text('번호가 사용 가능합니다.').css('color', 'green');
				validationStatus.phoneNumber = true;
				updateButtonState();
			}
		},
		error: function() {
			phoneError.text('전화번호를 확인하는 중에 오류가 발생했습니다. 다시 시도해주세요.').css('color', 'red');
			validationStatus.phoneNumber = false;
			updateButtonState();
		}
	});
}


// 생년월일 유효성 검사 함수
function validateBirthDate() {
	var birthDate = $('#birth').val();
	var birthError = $('#birth_error');

	// 이전 오류 메시지를 지웁니다.
	birthError.text('');

	// 생년월일이 YYYYMMDD 형식에 맞는지 확인합니다.
	var birthRegex = /^(19|20)\d\d(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
	if (!birthRegex.test(birthDate)) {
		birthError.text('생년월일 13자리를 입력해주세요.');
		validationStatus.birthDate = false;
		updateButtonState();
		return false;
	}

	// 여기에 추가적인 날짜 유효성 검사를 추가할 수 있습니다 (예: 과거 날짜인지 확인).
	validationStatus.birthDate = true;
	updateButtonState();
	return true;
}

// 사용자 이름 유효성 검사 함수
function validateUserName() {
	var userName = $('#userName').val();
	var nameError = $('#name_error');

	// 이전 오류 메시지를 지웁니다.
	nameError.text('');

	// 사용자 이름이 비어 있는지 확인합니다.
	if (userName.trim().length === 0) {
		nameError.text('이름을 입력해주세요.');
		validationStatus.userName = false;
		updateButtonState();
		return false;
	}

	// 사용자 이름 길이를 확인합니다(예: 최소 2자).
	if (userName.trim().length < 2) {
		nameError.text('이름은 최소 2자 이상이어야 합니다.');
		validationStatus.userName = false;
		updateButtonState();
		return false;
	}

	// 사용자 이름에 한글만 포함되어 있는지 확인합니다.
	if (!/^[가-힣\s]+$/.test(userName)) {
		nameError.text('특수 문자는 사용할 수 없으며 한글만 입력해주세요.');
		validationStatus.userName = false;
		updateButtonState();
		return false;
	}
	validationStatus.userName = true;
	updateButtonState();
	// 모든 검사를 통과했다면 true를 반환합니다.
	return true;
}

// 비밀번호 유효성 검사 함수
function validatePassword() {
	var password = $('#password').val();
	var confirmPassword = $('#password_check').val();

	// 이전 오류 메시지를 지웁니다.
	$('#password_error').text('');
	$('#password_check_error').text('');

	// 비밀번호가 최소 8자 이상인지 확인합니다.
	if (password.length < 8) {
		$('#password_error').text('비밀번호는 최소 8자 이상이어야 합니다.');
		mainValidationStatus.password = false;
		updateSignupButtonState();
		return false;
	}

	// 비밀번호에 특수 문자가 하나 이상 포함되어 있는지 확인합니다.
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		$('#password_error').text('비밀번호에는 적어도 하나의 특수 문자가 포함되어야 합니다.');
		mainValidationStatus.password = false;
		updateSignupButtonState();
		return false;
	}

	// 두 비밀번호가 일치하는지 확인합니다.
	if (password !== confirmPassword) {
		$('#password_check_error').text('비밀번호가 일치하지 않습니다.');
		mainValidationStatus.password = false;
		updateSignupButtonState();
		return false;
	}

	// 모든 검사를 통과했다면 true를 반환합니다.
	mainValidationStatus.password = true;
	updateSignupButtonState();
	return true;
}




//이메일 유효성 검사
function validationEmail() {
	//console.log('이메일 클릭 중');
	var userEmail = $('#userEmail')
	var emailError = $('#email_error')

	// 이전 오류 클래스 지음
	emailError.text("");

	// 입력 필드의 값을 가져옴
	userEmail = userEmail.val();

	// 간단한 이메일 정규 표현식 패턴을 정의합니다.
	var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	// 이메일이 패턴과 일치하는지 확인
	if (!emailRegex.test(userEmail)) {
		// 이메일이 유효하지 않으면 오류 메시지 표시
		emailError.text("유효한 이메일을 입력하세요.");
		validationStatus.userEmail = false;
		updateSignupButtonState();
	} else {
		// 이메일 형식이 유효하면 중복 검사 진행
		$.ajax({
			url: '/emailCheck',
			type: 'POST',
			data: { userEmail: userEmail },
			success: function(response) {
				// 서버 측 스크립트로부터의 응답을 처리
				// 이 예제는 'response'가 이메일이 중복인지를 나타내는 boolean 값이라고 가정합니다
				if (response === true) {
					// 이메일이 중복이면 오류 메시지 표시
					emailError.text("이 이메일은 이미 사용 중입니다.");
					mainValidationStatus.userEmail = false;
					updateSignupButtonState();
				} else {
					// 이전 오류 클래스 지음
					mainValidationStatus.userEmail = true;
					updateSignupButtonState();
				}
			},
			error: function() {
				// AJAX 요청 오류 처리
				emailError.text("서버 오류가 발생했습니다. 나중에 다시 시도하세요.");
				mainValidationStatus.userEmail = false;
				updateSignupButtonState();
			}
		});
	}
}



// 카카오 우편 API  사용
function execDaumPostcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var addr = ''; // 주소 변수
			var extraAddr = ''; // 참고항목 변수

			//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				addr = data.roadAddress;
			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				addr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
			if (data.userSelectedType === 'R') {
				// 법정동명이 있을 경우 추가한다. (법정리는 제외)
				// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
				if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
					extraAddr += data.bname;
				}
				// 건물명이 있고, 공동주택일 경우 추가한다.
				if (data.buildingName !== '' && data.apartment === 'Y') {
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
				if (extraAddr !== '') {
					extraAddr = ' (' + extraAddr + ')';
				}
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('postcode').value = data.zonecode;
			document.getElementById("address").value = addr;
			// 커서를 상세주소 필드로 이동한다.
			document.getElementById("detailAddress").focus();
		}
	}).open();
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 