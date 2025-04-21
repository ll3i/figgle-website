// login.js - 로그인 관련 기능

document.addEventListener('DOMContentLoaded', () => {
    // 로그인 상태 확인
    checkLoginStatus();
    
    // 로그인 버튼 이벤트 처리
    setupLoginButton();
});

// 로그인 상태 확인 및 UI 업데이트
function checkLoginStatus() {
    const loginButton = document.querySelector('nav a.btn-primary');
    if (!loginButton) return;
    
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        loginButton.textContent = '내 계정';
        loginButton.href = '#my-account';
        
        // 로그아웃 버튼 추가
        const logoutButton = document.createElement('a');
        logoutButton.href = '#';
        logoutButton.classList.add('btn-logout');
        logoutButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> 로그아웃';
        logoutButton.style.marginLeft = '0.8rem';
        
        loginButton.parentNode.insertBefore(logoutButton, loginButton.nextSibling);
        
        // 로그아웃 이벤트 처리
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

// 로그인 버튼 설정
function setupLoginButton() {
    const loginButton = document.querySelector('nav a.btn-primary');
    if (!loginButton) return;
    
    // 이미 로그인 상태면 로그인 모달 띄우지 않음
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            showAccountMenu();
        });
        return;
    }
    
    // 로그인 모달 생성
    createLoginModal();
    
    // 로그인 버튼 클릭 시 모달 표시
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-modal').style.display = 'block';
    });
}

// 로그인 모달 생성
function createLoginModal() {
    // 이미 모달이 있으면 생성하지 않음
    if (document.getElementById('login-modal')) return;
    
    const loginModal = document.createElement('div');
    loginModal.id = 'login-modal';
    loginModal.classList.add('modal');
    loginModal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>로그인</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="login-email">이메일</label>
                    <input type="email" id="login-email" placeholder="이메일을 입력하세요" required>
                </div>
                <div class="form-group">
                    <label for="login-password">비밀번호</label>
                    <input type="password" id="login-password" placeholder="비밀번호를 입력하세요" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">로그인</button>
                    <a href="signup.html" class="btn btn-secondary">회원가입</a>
                </div>
                <div class="forgot-password">
                    <a href="#" id="forgot-password">비밀번호를 잊으셨나요?</a>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(loginModal);
    
    // 모달 닫기 버튼
    const closeBtn = loginModal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });
    
    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    // 로그인 폼 제출 처리
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(this);
        });
    }
    
    // 비밀번호 찾기
    const forgotPasswordLink = document.getElementById('forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleForgotPassword();
        });
    }
}

// 로그인 처리
function handleLogin(form) {
    const email = form.querySelector('#login-email').value.trim();
    const password = form.querySelector('#login-password').value.trim();
    
    // 간단한 유효성 검사
    if (!email || !password) {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
    }
    
    // 실제 로그인 처리 (서버 통신 대신 시뮬레이션)
    // 데모용으로 간단하게 처리
    // TODO: 실제 서버 통신 구현
    
    // 임시 로그인 성공 처리
    alert('로그인 성공! 환영합니다.');
    
    // 로그인 상태 저장
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
    
    // 모달 닫기
    document.getElementById('login-modal').style.display = 'none';
    
    // UI 업데이트
    updateUI();
    
    // 페이지 새로고침
    location.reload();
}

// 비밀번호 찾기 처리
function handleForgotPassword() {
    const email = prompt('비밀번호 재설정 링크를 받을 이메일을 입력하세요:');
    
    if (!email) return;
    
    if (!isValidEmail(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
    }
    
    // 실제로는 서버에 요청 필요
    alert('비밀번호 재설정 이메일을 발송했습니다. 이메일을 확인해주세요.');
}

// 로그아웃 처리
function logout() {
    // 확인 요청
    if (!confirm('로그아웃 하시겠습니까?')) return;
    
    // 세션 스토리지 초기화
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    
    // 페이지 새로고침
    location.reload();
}

// 로그인 후 UI 업데이트
function updateUI() {
    const loginButton = document.querySelector('nav a.btn-primary');
    if (!loginButton) return;
    
    loginButton.textContent = '내 계정';
    loginButton.href = '#my-account';
}

// 내 계정 메뉴 표시
function showAccountMenu() {
    alert('계정 관리 페이지로 이동합니다.');
    // TODO: 계정 관리 페이지 구현
}

// 이메일 유효성 검사
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} 