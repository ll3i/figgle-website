// AI 튜터 기능 구현
class AITutor {
    constructor() {
        this.apiEndpoint = 'https://api.core.ai/v1/tutor'; // 실제 백엔드 API 엔드포인트로 변경 필요
        this.conversationHistory = [];
        this.isProcessing = false;
        this.subjectArea = null;
        this.userLevel = 'intermediate'; // 기본값, 사용자 설정에 따라 변경 가능
    }

    // 새 대화 시작
    startNewConversation(subjectArea = 'general') {
        this.conversationHistory = [];
        this.subjectArea = subjectArea;
        return this.getInitialGreeting();
    }

    // 초기 인사 메시지
    getInitialGreeting() {
        const greetings = {
            'general': '안녕하세요! Co:Re AI 튜터입니다. 어떤 과목의 학습을 도와드릴까요?',
            'math': '안녕하세요! 수학 학습을 도와드릴 Co:Re AI 튜터입니다. 어떤 개념에 대해 알고 싶으신가요?',
            'programming': '안녕하세요! 프로그래밍 학습을 도와드릴 Co:Re AI 튜터입니다. 어떤 언어나 개념이 궁금하신가요?',
            'science': '안녕하세요! 과학 학습을 도와드릴 Co:Re AI 튜터입니다. 어떤 주제에 관심이 있으신가요?',
            'language': '안녕하세요! 언어 학습을 도와드릴 Co:Re AI 튜터입니다. 어떤 부분을 연습하고 싶으신가요?'
        };
        
        return greetings[this.subjectArea] || greetings['general'];
    }

    // 사용자 메시지 처리 및 응답 생성
    async processMessage(userMessage) {
        if (this.isProcessing) {
            return { success: false, message: '이전 메시지를 처리 중입니다. 잠시만 기다려주세요.' };
        }
        
        this.isProcessing = true;
        
        try {
            // 대화 기록에 사용자 메시지 추가
            this.conversationHistory.push({ role: 'user', content: userMessage });
            
            // 실제 서비스에서는 서버 API 호출
            // 여기서는 간단한 데모 응답을 위한 모의 구현
            const response = await this.callTutorAPI(userMessage);
            
            // 대화 기록에 AI 응답 추가
            this.conversationHistory.push({ role: 'assistant', content: response.message });
            
            this.isProcessing = false;
            return response;
        } catch (error) {
            console.error('AI 튜터 오류:', error);
            this.isProcessing = false;
            return { 
                success: false, 
                message: '죄송합니다. 요청을 처리하는 중에 오류가 발생했습니다. 다시 시도해주세요.' 
            };
        }
    }

    // AI 튜터 API 호출 (실제 구현에서는 서버로 요청 보냄)
    async callTutorAPI(userMessage) {
        // 실제 구현에서는 fetch 또는 axios를 사용하여 백엔드 API 호출
        // 여기서는 간단한 데모를 위해 시뮬레이션
        
        // API 호출 시뮬레이션 (지연 시간 추가)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 간단한 키워드 기반 응답 로직 (실제로는 서버에서 AI 모델이 처리)
        let response = '';
        
        if (userMessage.includes('수학') || userMessage.includes('방정식') || userMessage.includes('미적분')) {
            response = '수학은 논리적 사고력을 기르는 데 매우 중요한 과목입니다. 어떤 수학 개념이 어려우신가요? 방정식, 함수, 미적분 등 구체적인 주제를 알려주시면 더 자세히 설명해 드릴 수 있습니다.';
        } else if (userMessage.includes('프로그래밍') || userMessage.includes('코딩') || userMessage.includes('개발')) {
            response = '프로그래밍은 문제 해결 능력을 키우는 좋은 방법입니다. 특정 프로그래밍 언어나 개념에 대해 알고 싶으신가요? 기초부터 차근차근 설명해 드릴 수 있습니다.';
        } else if (userMessage.includes('영어') || userMessage.includes('언어')) {
            response = '언어 학습은 꾸준한 연습이 중요합니다. 어휘, 문법, 회화 중 어떤 부분을 중점적으로 학습하고 싶으신가요? 맞춤형 학습 계획을 세워드릴 수 있습니다.';
        } else if (userMessage.includes('도움') || userMessage.includes('어떻게')) {
            response = '제가 도와드릴 수 있는 부분은 학습 내용 설명, 문제 풀이 가이드, 학습 계획 수립 등입니다. 구체적인 주제나 질문을 알려주시면 더 정확한 도움을 드릴 수 있습니다.';
        } else if (userMessage.includes('과학') || userMessage.includes('물리') || userMessage.includes('화학') || userMessage.includes('생물')) {
            response = '과학은 우리 주변의 현상을 이해하는 데 도움을 주는 흥미로운 분야입니다. 물리, 화학, 생물 중 어떤 분야에 관심이 있으신가요? 개념 설명과 함께 실생활 예시를 들어 설명해 드릴 수 있습니다.';
        } else if (userMessage.length < 10) {
            response = '조금 더 자세히 알려주시면 더 정확한 도움을 드릴 수 있습니다. 어떤 주제에 관심이 있으신가요?';
        } else {
            const generalResponses = [
                '흥미로운 질문이네요! 이 주제에 대해 더 자세히 알려드릴게요. 먼저, 기본 개념부터 살펴보는 것이 좋겠습니다.',
                '이 개념을 이해하는 데 어려움을 겪고 계신군요. 걱정 마세요, 단계별로 차근차근 설명해 드리겠습니다.',
                '좋은 질문입니다! 이 주제는 다음과 같은 핵심 포인트로 요약할 수 있습니다. 천천히 함께 살펴볼까요?',
                '이 부분은 많은 학생들이 어려워하는 부분이에요. 제가 쉬운 예시를 들어 설명해 드리겠습니다.',
                '학습 중이신 내용을 잘 이해하고 계신 것 같네요! 조금 더 심화된 내용으로 넘어가 볼까요?'
            ];
            response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
        }
        
        return { success: true, message: response };
    }

    // 대화 기록 저장 (로컬 스토리지 활용)
    saveConversation() {
        if (this.conversationHistory.length > 0) {
            const savedConversations = JSON.parse(localStorage.getItem('tutorConversations') || '[]');
            savedConversations.push({
                id: Date.now(),
                subject: this.subjectArea,
                timestamp: new Date().toISOString(),
                history: this.conversationHistory
            });
            
            // 최대 10개의 대화만 저장
            if (savedConversations.length > 10) {
                savedConversations.shift();
            }
            
            localStorage.setItem('tutorConversations', JSON.stringify(savedConversations));
        }
    }

    // 이전 대화 불러오기
    loadConversation(conversationId) {
        const savedConversations = JSON.parse(localStorage.getItem('tutorConversations') || '[]');
        const conversation = savedConversations.find(conv => conv.id === conversationId);
        
        if (conversation) {
            this.conversationHistory = conversation.history;
            this.subjectArea = conversation.subject;
            return { success: true, history: this.conversationHistory };
        }
        
        return { success: false, message: '대화를 찾을 수 없습니다.' };
    }
    
    // 학습 리소스 추천
    recommendResources(topic) {
        // 실제 구현에서는 서버 API를 통해 추천 리소스 목록 받아오기
        const resourcesByTopic = {
            'math': [
                { title: '수학의 정석', type: 'book', url: '#' },
                { title: '칸 아카데미 - 미적분', type: 'video', url: '#' },
                { title: '수학 개념 정리 노트', type: 'pdf', url: '#' }
            ],
            'programming': [
                { title: '모던 자바스크립트 튜토리얼', type: 'website', url: '#' },
                { title: '파이썬 기초 프로그래밍', type: 'course', url: '#' },
                { title: '코딩 테스트 연습 문제집', type: 'practice', url: '#' }
            ],
            'science': [
                { title: '물리학의 이해', type: 'book', url: '#' },
                { title: '화학 기초 실험', type: 'video', url: '#' },
                { title: '생물학 개념도', type: 'pdf', url: '#' }
            ]
        };
        
        return resourcesByTopic[topic] || [];
    }
    
    // 학습 진도 추적 데이터 생성
    generateProgressData() {
        // 실제 구현에서는 사용자의 학습 데이터 기반으로 계산
        return {
            completedTopics: ['기초 개념', '초급 문제풀이'],
            inProgressTopics: ['중급 개념'],
            recommendedTopics: ['고급 문제풀이', '실전 응용'],
            topicMastery: {
                '기초 개념': 95,
                '초급 문제풀이': 87,
                '중급 개념': 42,
                '고급 문제풀이': 0,
                '실전 응용': 0
            }
        };
    }
}

// 전역 변수로 AI 튜터 인스턴스 생성
const aiTutor = new AITutor();

// 페이지 로드 시 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    // AI 튜터 기능 초기화 (데모 페이지에서만 실행)
    const tutorInput = document.getElementById('tutor-input');
    const tutorSend = document.getElementById('tutor-send');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (tutorInput && tutorSend && chatMessages) {
        // 초기 인사 메시지 표시
        const initialGreeting = aiTutor.startNewConversation();
        if (!chatMessages.querySelector('.message.bot')) {
            addMessage(initialGreeting, false);
        }
        
        // 메시지 전송 버튼 클릭 이벤트
        tutorSend.addEventListener('click', async function() {
            const text = tutorInput.value.trim();
            if (!text) return;
            
            // 사용자 메시지 추가
            addMessage(text, true);
            tutorInput.value = '';
            
            // 로딩 표시
            const loadingMessage = document.createElement('div');
            loadingMessage.classList.add('message', 'bot', 'loading');
            loadingMessage.textContent = '입력 중...';
            chatMessages.appendChild(loadingMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // AI 응답 처리
            const response = await aiTutor.processMessage(text);
            
            // 로딩 메시지 제거
            chatMessages.removeChild(loadingMessage);
            
            // AI 응답 추가
            if (response.success) {
                addMessage(response.message, false);
            } else {
                addMessage('죄송합니다. 오류가 발생했습니다: ' + response.message, false);
            }
        });
        
        // 엔터 키 이벤트
        tutorInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                tutorSend.click();
            }
        });
        
        // 메시지 추가 함수
        function addMessage(text, isUser) {
            const message = document.createElement('div');
            message.classList.add('message');
            message.classList.add(isUser ? 'user' : 'bot');
            message.textContent = text;
            chatMessages.appendChild(message);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}); 