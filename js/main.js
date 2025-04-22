// Co:Re 메인 자바스크립트 파일

document.addEventListener('DOMContentLoaded', () => {
  // 스크롤 애니메이션 효과
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // 애니메이션 대상 요소들
  const animatedElements = document.querySelectorAll('.feature, .benefit-item, .testimonial, .pricing-plan');
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // 네비게이션 스크롤 처리
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 모바일 메뉴 처리
  const addMobileMenuToggle = () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // 모바일 메뉴 버튼 추가
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';
    
    // 창 크기가 작을 때 버튼 표시
    const checkWindowSize = () => {
      if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
        nav.classList.add('mobile-nav');
      } else {
        mobileMenuBtn.style.display = 'none';
        nav.classList.remove('mobile-nav');
        nav.classList.remove('active');
      }
    };
    
    // 버튼 클릭시 메뉴 토글
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    
    // 초기화
    header.insertBefore(mobileMenuBtn, nav);
    checkWindowSize();
    
    // 화면 크기 변경 감지
    window.addEventListener('resize', checkWindowSize);
  };
  
  // 모바일 메뉴 토글 기능 활성화
  addMobileMenuToggle();

  // 문의하기 폼 처리
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 간단한 폼 유효성 검사
      const name = this.querySelector('#name').value.trim();
      const email = this.querySelector('#email').value.trim();
      const message = this.querySelector('#message').value.trim();
      
      if (!name || !email || !message) {
        alert('모든 필드를 입력해주세요.');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
      }
      
      // 폼 제출 성공 시 메시지
      alert('메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.');
      this.reset();
    });
  }
  
  // 이메일 유효성 검사 함수
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // CSS 애니메이션을 위한 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .mobile-nav {
      display: none;
    }
    .mobile-nav.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--primary-color);
      padding: 1rem;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    .mobile-menu-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
    @media (max-width: 768px) {
      .mobile-nav {
        display: none;
      }
      .mobile-nav.active {
        display: flex;
      }
    }
    
    /* 모달 스타일 */
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }
    .modal-content {
      background-color: white;
      margin: 10% auto;
      padding: 2rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      width: 90%;
      max-width: 500px;
      position: relative;
    }
    .close {
      position: absolute;
      right: 1.5rem;
      top: 1rem;
      font-size: 2rem;
      color: var(--light-text);
      cursor: pointer;
    }
    .close:hover {
      color: var(--text-color);
    }
    .modal h2 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .form-group {
      margin-bottom: 1.2rem;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .form-actions button {
      flex: 1;
    }
    .forgot-password {
      margin-top: 1rem;
      text-align: center;
    }
    .forgot-password a {
      color: var(--primary-color);
      font-size: 0.9rem;
      text-decoration: none;
    }
    .forgot-password a:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);
  
  // 요금제 버튼 기능 구현
  const pricingButtons = document.querySelectorAll('.pricing-plan .btn');
  pricingButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 로그인 확인
      if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        alert('서비스를 이용하기 위해 로그인이 필요합니다.');
        loginModal.style.display = 'block';
      } else {
        // 해당 요금제 선택 처리
        const planName = this.closest('.pricing-plan').querySelector('h3').textContent;
        alert(`${planName} 요금제를 선택하셨습니다. 결제 페이지로 이동합니다.`);
        // 결제 페이지 이동 처리 (구현 필요시)
      }
    });
  });
});
