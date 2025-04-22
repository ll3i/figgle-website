// 1Day1Message 기능 구현
class DailyMessage {
    constructor() {
        this.apiEndpoint = 'https://api.figgle.ai/v1/daily-message';
        this.userId = null;
        this.messageHistory = [];
        this.todayMessage = null;
        this.preferences = {
            categories: [],
            style: 'motivational',
            receiveTime: '07:00',
            isEnabled: true
        };
        this.streak = 0;
        this.lastMessageDate = null;
    }

    // 사용자 초기화
    initUser(userId, preferences = null) {
        this.userId = userId;
        
        if (preferences) {
            this.preferences = {
                ...this.preferences,
                ...preferences
            };
        }
        
        // 기록 로드
        this.loadMessageHistory();
        
        // 오늘의 메시지 확인
        this.checkTodayMessage();
        
        return {
            success: true,
            message: '사용자가 초기화되었습니다.'
        };
    }

    // 메시지 기록 로드
    loadMessageHistory() {
        // 실제 구현에서는 API 호출
        // 여기서는 데모 데이터 사용
        
        const today = new Date();
        this.messageHistory = [];
        
        // 30일간의 메시지 기록 생성
        for (let i = 1; i <= 30; i++) {
            const messageDate = new Date(today);
            messageDate.setDate(today.getDate() - i);
            
            // 90% 확률로 메시지 있음 (일부 놓친 날 시뮬레이션)
            const hasMessage = Math.random() > 0.1;
            
            if (hasMessage) {
                const message = this.generateRandomMessage(messageDate);
                this.messageHistory.push(message);
                
                // 가장 최근 메시지 날짜 기록
                if (!this.lastMessageDate || messageDate > this.lastMessageDate) {
                    this.lastMessageDate = new Date(messageDate);
                }
            }
        }
        
        // 연속 기록 계산
        this.calculateStreak();
        
        return {
            success: true,
            history: this.messageHistory,
            message: '메시지 기록이 로드되었습니다.'
        };
    }

    // 오늘의 메시지 확인
    checkTodayMessage() {
        const today = new Date().setHours(0, 0, 0, 0);
        
        // 이미 오늘 메시지가 있는지 확인
        const existingMessage = this.messageHistory.find(msg => {
            const msgDate = new Date(msg.date).setHours(0, 0, 0, 0);
            return msgDate === today;
        });
        
        if (existingMessage) {
            this.todayMessage = existingMessage;
        } else {
            // 오늘 메시지 생성
            const now = new Date();
            const targetTime = this.parseTimeString(this.preferences.receiveTime);
            
            // 설정된 시간이 지난 경우에만 메시지 생성
            if (now.getHours() >= targetTime.hours && now.getMinutes() >= targetTime.minutes) {
                this.generateTodayMessage();
            }
        }
        
        return {
            success: true,
            todayMessage: this.todayMessage,
            message: this.todayMessage ? '오늘의 메시지가 있습니다.' : '아직 오늘의 메시지가 생성되지 않았습니다.'
        };
    }

    // 오늘의 메시지 생성
    generateTodayMessage() {
        const today = new Date();
        this.todayMessage = this.generateRandomMessage(today);
        
        // 기록에 추가
        this.messageHistory.unshift(this.todayMessage);
        
        // 연속 기록 업데이트
        this.lastMessageDate = new Date(today);
        this.calculateStreak();
        
        return {
            success: true,
            message: this.todayMessage,
            streak: this.streak
        };
    }

    // 랜덤 메시지 생성 (데모용)
    generateRandomMessage(date) {
        const messageTemplates = {
            motivational: [
                "오늘 하루도 당신의 노력이 미래를 만듭니다. 포기하지 말고 계속 나아가세요.",
                "실패는 성공의 어머니입니다. 오늘의 도전이 내일의 성취로 이어집니다.",
                "작은 진전이라도 매일 이루어낸다면, 그것이 모여 큰 변화가 됩니다.",
                "당신의 한계는 스스로 정하는 것입니다. 한계를 뛰어넘을 용기를 가지세요.",
                "오늘 배운 것이 내일의 지혜가 됩니다. 학습의 여정을 즐기세요.",
                "목표를 향한 작은 걸음도 중요합니다. 오늘 한 걸음 더 나아가세요.",
                "어제보다 나은 오늘, 오늘보다 나은 내일을 위해 노력하세요.",
                "시간은 가장 귀중한 자원입니다. 오늘 하루를 의미 있게 보내세요.",
                "당신의 잠재력은 무한합니다. 자신을 믿고 한계에 도전하세요.",
                "지식은 나눌수록 커집니다. 오늘 배운 것을 누군가와 공유해보세요."
            ],
            informative: [
                "효과적인 학습을 위해서는 집중력이 중요합니다. 25분 집중, 5분 휴식의 포모도로 기법을 시도해보세요.",
                "기억력을 높이는 방법: 배운 내용을 자신의 말로 다시 설명해보는 것이 효과적입니다.",
                "다양한 학습 방식을 시도해보세요. 시각, 청각, 운동감각적 학습 중 자신에게 맞는 방식을 찾는 것이 중요합니다.",
                "스트레스는 학습 능력을 저하시킵니다. 적절한 휴식과 명상으로 마음의 여유를 가지세요.",
                "충분한 수면은 기억 공고화에 중요합니다. 7-8시간의 양질의 수면을 취하세요.",
                "운동은 뇌 기능을 향상시킵니다. 하루 30분의 유산소 운동이 학습 효율을 높일 수 있습니다.",
                "복잡한 개념을 이해하기 위해서는 관련 예시를 찾아보거나 비유를 사용해보세요.",
                "학습 환경도 중요합니다. 조용하고 정돈된 공간에서 집중력이 향상됩니다.",
                "뇌는 반복을 통해 학습합니다. 배운 내용을 주기적으로 복습하는 것이 기억 유지에 도움이 됩니다.",
                "다른 사람에게 배운 내용을 가르치는 것은 가장 효과적인 학습 방법 중 하나입니다."
            ],
            quotes: [
                "\"교육은 마음을 비우는 것이 아니라, 채우는 것이다.\" - 말콤 포브스",
                "\"배움에는 끝이 없다. 인생도 그러하다.\" - 로버트 헤인라인",
                "\"당신이 원하는 것을 얻기 위해서는, 먼저 당신이 바라는 사람이 되어야 한다.\" - 마하트마 간디",
                "\"실패는 성공을 위한 첫걸음이다.\" - 소크라테스",
                "\"과거에서 배우되, 현재를 살며, 미래를 꿈꾸어라.\" - 앨버트 아인슈타인",
                "\"자신감은 위대한 일의 첫 번째 조건이다.\" - 사무엘 존슨",
                "\"당신의 시간은 제한되어 있으니, 다른 사람의 삶을 사느라 시간을 낭비하지 마세요.\" - 스티브 잡스",
                "\"지식이 없는 세상은 어둠 속의 삶과 같다.\" - 로저 베이컨",
                "\"배움은 결코 늙지 않는다.\" - 플라톤",
                "\"나약한 태도는 성격도 나약하게 만든다.\" - 알버트 아인슈타인"
            ],
            challenge: [
                "오늘의 도전: 평소에 시도하지 않았던 학습 방법을 한 가지 시도해보세요.",
                "오늘의 도전: 어려운 문제 하나를 선택하고 다양한 각도에서 해결책을 모색해보세요.",
                "오늘의 도전: 오늘 배운 내용을 5분 안에 누군가에게 설명해보세요.",
                "오늘의 도전: 학습 계획을 세우고 작은 목표부터 달성해보세요.",
                "오늘의 도전: 집중력을 방해하는 요소를 하나 제거하고 학습 환경을 개선해보세요.",
                "오늘의 도전: 평소 관심 없던 분야의 책이나 자료를 읽고 새로운 지식을 습득해보세요.",
                "오늘의 도전: 배운 내용을 마인드맵으로 시각화해보세요.",
                "오늘의 도전: 어려운 개념을 쉬운 말로 풀어서 설명해보세요.",
                "오늘의 도전: 오늘 하루 동안의 학습 내용을 저녁에 다시 복습해보세요.",
                "오늘의 도전: 새로운 학습 목표를 하나 설정하고 달성 계획을 세워보세요."
            ]
        };
        
        // 선호하는 카테고리 또는 랜덤 선택
        const availableCategories = this.preferences.categories.length > 0 
            ? this.preferences.categories 
            : Object.keys(messageTemplates);
        
        const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        const templates = messageTemplates[category];
        const content = templates[Math.floor(Math.random() * templates.length)];
        
        // 주제 생성
        const topics = ['학습법', '동기부여', '시간관리', '집중력', '자기계발', '목표설정', '습관형성'];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        
        // 메시지 객체 생성
        return {
            id: 'msg_' + Date.now() + Math.floor(Math.random() * 1000),
            date: date.toISOString(),
            category,
            topic,
            content,
            isRead: date < new Date(), // 과거 메시지는 읽음 처리
            isFavorite: Math.random() > 0.8, // 20% 확률로 즐겨찾기
            reaction: Math.random() > 0.3 ? Math.floor(Math.random() * 3) + 1 : 0 // 70% 확률로 반응 있음 (1-3)
        };
    }

    // 시간 문자열 파싱 (HH:MM 형식)
    parseTimeString(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return { hours, minutes };
    }

    // 연속 기록 계산
    calculateStreak() {
        if (!this.lastMessageDate) {
            this.streak = 0;
            return;
        }
        
        const today = new Date().setHours(0, 0, 0, 0);
        const lastDate = new Date(this.lastMessageDate).setHours(0, 0, 0, 0);
        
        // 오늘 메시지가 있는 경우
        if (lastDate === today) {
            // 과거 메시지 검사하여 연속 기록 계산
            let currentStreak = 1;
            let currentDate = new Date(today);
            
            for (let i = 1; i <= 60; i++) { // 최대 60일까지 검사
                currentDate.setDate(currentDate.getDate() - 1);
                const prevDate = currentDate.setHours(0, 0, 0, 0);
                
                // 해당 날짜에 메시지가 있는지 확인
                const hasMessage = this.messageHistory.some(msg => {
                    const msgDate = new Date(msg.date).setHours(0, 0, 0, 0);
                    return msgDate === prevDate;
                });
                
                if (hasMessage) {
                    currentStreak++;
                } else {
                    break; // 연속 기록이 끊김
                }
            }
            
            this.streak = currentStreak;
        } 
        // 어제 메시지가 있는 경우 (오늘은 아직)
        else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayDate = yesterday.setHours(0, 0, 0, 0);
            
            if (lastDate === yesterdayDate) {
                // 이전과 같은 방식으로 연속 기록 계산
                let currentStreak = 1;
                let currentDate = new Date(yesterday);
                
                for (let i = 1; i <= 60; i++) {
                    currentDate.setDate(currentDate.getDate() - 1);
                    const prevDate = currentDate.setHours(0, 0, 0, 0);
                    
                    const hasMessage = this.messageHistory.some(msg => {
                        const msgDate = new Date(msg.date).setHours(0, 0, 0, 0);
                        return msgDate === prevDate;
                    });
                    
                    if (hasMessage) {
                        currentStreak++;
                    } else {
                        break;
                    }
                }
                
                this.streak = currentStreak;
            } else {
                // 연속 기록이 끊어짐
                this.streak = 0;
            }
        }
        
        return this.streak;
    }

    // 메시지 읽음 처리
    markAsRead(messageId) {
        const message = this.messageHistory.find(msg => msg.id === messageId);
        
        if (message) {
            message.isRead = true;
            return {
                success: true,
                message: '메시지가 읽음 처리되었습니다.'
            };
        }
        
        return {
            success: false,
            message: '해당 메시지를 찾을 수 없습니다.'
        };
    }

    // 메시지 즐겨찾기 토글
    toggleFavorite(messageId) {
        const message = this.messageHistory.find(msg => msg.id === messageId);
        
        if (message) {
            message.isFavorite = !message.isFavorite;
            return {
                success: true,
                isFavorite: message.isFavorite,
                message: message.isFavorite ? '즐겨찾기에 추가되었습니다.' : '즐겨찾기에서 제거되었습니다.'
            };
        }
        
        return {
            success: false,
            message: '해당 메시지를 찾을 수 없습니다.'
        };
    }

    // 메시지에 반응 추가
    addReaction(messageId, reactionType) {
        const message = this.messageHistory.find(msg => msg.id === messageId);
        
        if (message) {
            message.reaction = reactionType;
            return {
                success: true,
                reaction: reactionType,
                message: '반응이 추가되었습니다.'
            };
        }
        
        return {
            success: false,
            message: '해당 메시지를 찾을 수 없습니다.'
        };
    }

    // 환경설정 업데이트
    updatePreferences(newPreferences) {
        this.preferences = {
            ...this.preferences,
            ...newPreferences
        };
        
        return {
            success: true,
            preferences: this.preferences,
            message: '환경설정이 업데이트되었습니다.'
        };
    }

    // 즐겨찾기 메시지 조회
    getFavoriteMessages() {
        const favorites = this.messageHistory.filter(msg => msg.isFavorite);
        
        return {
            success: true,
            messages: favorites,
            count: favorites.length
        };
    }

    // 카테고리별 메시지 조회
    getMessagesByCategory(category) {
        const messages = this.messageHistory.filter(msg => msg.category === category);
        
        return {
            success: true,
            messages,
            count: messages.length
        };
    }

    // 주제별 메시지 조회
    getMessagesByTopic(topic) {
        const messages = this.messageHistory.filter(msg => msg.topic === topic);
        
        return {
            success: true,
            messages,
            count: messages.length
        };
    }
}

// 페이지 로드 시 DailyMessage 객체 생성 및 UI 이벤트 연결
document.addEventListener('DOMContentLoaded', () => {
    // 전역 인스턴스 생성
    window.dailyMessage = new DailyMessage();
    
    // 데모 사용자 ID로 초기화
    window.dailyMessage.initUser('demo_user_' + Date.now(), {
        categories: ['motivational', 'challenge'],
        style: 'motivational',
        receiveTime: '07:00',
        isEnabled: true
    });
    
    // UI 초기화
    initUI();
});

// UI 초기화 함수
function initUI() {
    // 필요한 UI 요소들
    const todayMessageCard = document.getElementById('today-message-card');
    const messageHistoryContainer = document.getElementById('message-history');
    const streakCounter = document.getElementById('streak-counter');
    const favoriteMessagesContainer = document.getElementById('favorite-messages');
    const preferencesForm = document.getElementById('preferences-form');
    
    // 오늘의 메시지 표시
    if (todayMessageCard && window.dailyMessage.todayMessage) {
        const message = window.dailyMessage.todayMessage;
        
        todayMessageCard.innerHTML = `
            <div class="message-header">
                <span class="message-date">${new Date(message.date).toLocaleDateString()}</span>
                <span class="message-category ${message.category}">${message.category}</span>
            </div>
            <div class="message-content">
                <p>${message.content}</p>
            </div>
            <div class="message-actions">
                <button class="action-btn favorite-btn ${message.isFavorite ? 'active' : ''}" 
                    data-message-id="${message.id}">
                    <i class="fas ${message.isFavorite ? 'fa-star' : 'fa-star-o'}"></i>
                </button>
                <div class="reaction-btns">
                    <button class="reaction-btn ${message.reaction === 1 ? 'active' : ''}" data-reaction="1" data-message-id="${message.id}">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <button class="reaction-btn ${message.reaction === 2 ? 'active' : ''}" data-reaction="2" data-message-id="${message.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="reaction-btn ${message.reaction === 3 ? 'active' : ''}" data-reaction="3" data-message-id="${message.id}">
                        <i class="fas fa-lightbulb"></i>
                    </button>
                </div>
            </div>
        `;
        
        // 메시지 읽음 처리
        if (!message.isRead) {
            window.dailyMessage.markAsRead(message.id);
        }
        
        // 이벤트 리스너 추가
        const favoriteBtn = todayMessageCard.querySelector('.favorite-btn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', function() {
                const messageId = this.getAttribute('data-message-id');
                const result = window.dailyMessage.toggleFavorite(messageId);
                
                if (result.success) {
                    this.classList.toggle('active');
                    this.querySelector('i').classList.toggle('fa-star');
                    this.querySelector('i').classList.toggle('fa-star-o');
                    
                    // 즐겨찾기 목록 업데이트
                    if (favoriteMessagesContainer) {
                        updateFavoriteMessages();
                    }
                }
            });
        }
        
        const reactionBtns = todayMessageCard.querySelectorAll('.reaction-btn');
        reactionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const messageId = this.getAttribute('data-message-id');
                const reactionType = parseInt(this.getAttribute('data-reaction'));
                
                const result = window.dailyMessage.addReaction(messageId, reactionType);
                
                if (result.success) {
                    // 기존 활성화된 버튼 제거
                    reactionBtns.forEach(b => b.classList.remove('active'));
                    
                    // 현재 버튼 활성화
                    this.classList.add('active');
                }
            });
        });
    }
    
    // 연속 기록 표시
    if (streakCounter) {
        streakCounter.textContent = window.dailyMessage.streak;
        
        // 5일 이상이면 강조
        if (window.dailyMessage.streak >= 5) {
            streakCounter.classList.add('highlight');
        }
    }
    
    // 메시지 기록 표시
    if (messageHistoryContainer) {
        updateMessageHistory();
    }
    
    // 즐겨찾기 메시지 표시
    if (favoriteMessagesContainer) {
        updateFavoriteMessages();
    }
    
    // 환경설정 폼 이벤트 처리
    if (preferencesForm) {
        // 폼 초기값 설정
        const categoryInputs = preferencesForm.querySelectorAll('input[name="categories"]');
        categoryInputs.forEach(input => {
            if (window.dailyMessage.preferences.categories.includes(input.value)) {
                input.checked = true;
            }
        });
        
        const styleSelect = preferencesForm.querySelector('select[name="style"]');
        if (styleSelect) {
            styleSelect.value = window.dailyMessage.preferences.style;
        }
        
        const timeInput = preferencesForm.querySelector('input[name="receiveTime"]');
        if (timeInput) {
            timeInput.value = window.dailyMessage.preferences.receiveTime;
        }
        
        const enabledInput = preferencesForm.querySelector('input[name="isEnabled"]');
        if (enabledInput) {
            enabledInput.checked = window.dailyMessage.preferences.isEnabled;
        }
        
        // 폼 제출 이벤트
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 선택된 카테고리 수집
            const selectedCategories = [];
            const categoryInputs = this.querySelectorAll('input[name="categories"]:checked');
            categoryInputs.forEach(input => {
                selectedCategories.push(input.value);
            });
            
            // 환경설정 업데이트
            const newPreferences = {
                categories: selectedCategories,
                style: this.querySelector('select[name="style"]').value,
                receiveTime: this.querySelector('input[name="receiveTime"]').value,
                isEnabled: this.querySelector('input[name="isEnabled"]').checked
            };
            
            window.dailyMessage.updatePreferences(newPreferences);
            
            // 성공 메시지 표시
            const messageElement = document.createElement('div');
            messageElement.className = 'success-message';
            messageElement.textContent = '환경설정이 저장되었습니다.';
            
            this.appendChild(messageElement);
            
            // 3초 후 메시지 제거
            setTimeout(() => {
                messageElement.remove();
            }, 3000);
        });
    }
}

// 메시지 기록 업데이트 함수
function updateMessageHistory() {
    const container = document.getElementById('message-history');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 최근 10개 메시지만 표시
    const recentMessages = window.dailyMessage.messageHistory.slice(0, 10);
    
    recentMessages.forEach(message => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.innerHTML = `
            <div class="message-date">${new Date(message.date).toLocaleDateString()}</div>
            <div class="message-preview">
                <p>${message.content.substring(0, 80)}${message.content.length > 80 ? '...' : ''}</p>
                <div class="message-tags">
                    <span class="category-tag ${message.category}">${message.category}</span>
                    <span class="topic-tag">${message.topic}</span>
                </div>
            </div>
            <div class="message-actions">
                <button class="action-btn favorite-btn ${message.isFavorite ? 'active' : ''}" 
                    data-message-id="${message.id}">
                    <i class="fas ${message.isFavorite ? 'fa-star' : 'fa-star-o'}"></i>
                </button>
            </div>
        `;
        
        container.appendChild(messageItem);
        
        // 즐겨찾기 버튼 이벤트 리스너
        const favoriteBtn = messageItem.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', function() {
            const messageId = this.getAttribute('data-message-id');
            const result = window.dailyMessage.toggleFavorite(messageId);
            
            if (result.success) {
                this.classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-star');
                this.querySelector('i').classList.toggle('fa-star-o');
                
                // 즐겨찾기 목록 업데이트
                updateFavoriteMessages();
            }
        });
    });
}

// 즐겨찾기 메시지 업데이트 함수
function updateFavoriteMessages() {
    const container = document.getElementById('favorite-messages');
    if (!container) return;
    
    container.innerHTML = '';
    
    const favoriteResult = window.dailyMessage.getFavoriteMessages();
    
    if (favoriteResult.messages.length === 0) {
        container.innerHTML = '<p class="empty-message">즐겨찾기한 메시지가 없습니다.</p>';
        return;
    }
    
    favoriteResult.messages.forEach(message => {
        const messageItem = document.createElement('div');
        messageItem.className = 'favorite-item';
        messageItem.innerHTML = `
            <div class="message-content">
                <p>${message.content}</p>
            </div>
            <div class="message-meta">
                <span class="message-date">${new Date(message.date).toLocaleDateString()}</span>
                <span class="category-tag ${message.category}">${message.category}</span>
            </div>
            <button class="remove-favorite-btn" data-message-id="${message.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(messageItem);
        
        // 즐겨찾기 제거 버튼 이벤트 리스너
        const removeBtn = messageItem.querySelector('.remove-favorite-btn');
        removeBtn.addEventListener('click', function() {
            const messageId = this.getAttribute('data-message-id');
            const result = window.dailyMessage.toggleFavorite(messageId);
            
            if (result.success) {
                // 즐겨찾기 목록 업데이트
                updateFavoriteMessages();
                
                // 기록 목록의 버튼 상태도 업데이트
                const historyBtn = document.querySelector(`.message-history .favorite-btn[data-message-id="${messageId}"]`);
                if (historyBtn) {
                    historyBtn.classList.remove('active');
                    historyBtn.querySelector('i').classList.remove('fa-star');
                    historyBtn.querySelector('i').classList.add('fa-star-o');
                }
            }
        });
    });
} 