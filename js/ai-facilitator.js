// AI 퍼실리테이터 기능 구현
class AIFacilitator {
    constructor() {
        this.apiEndpoint = 'https://api.figgle.ai/v1/facilitator';
        this.sessionId = null;
        this.participants = [];
        this.topics = [];
        this.currentTopic = null;
        this.ideas = [];
        this.votingResults = {};
        this.sessionActive = false;
        this.timer = null;
        this.timerDuration = 0;
        this.timerRemaining = 0;
    }

    // 세션 초기화
    initSession(sessionName, participants = [], topics = []) {
        this.sessionId = 'session_' + Date.now();
        this.sessionName = sessionName || '새 브레인스토밍 세션';
        this.participants = participants;
        this.topics = topics;
        this.currentTopic = topics.length > 0 ? topics[0] : null;
        this.ideas = [];
        this.votingResults = {};
        this.sessionActive = true;

        // 세션 초기화 이벤트 발생
        this.triggerEvent('sessionInitialized', {
            sessionId: this.sessionId,
            sessionName: this.sessionName,
            participants: this.participants,
            topics: this.topics
        });

        return {
            success: true,
            sessionId: this.sessionId,
            message: '세션이 초기화되었습니다.'
        };
    }

    // 주제 설정
    setCurrentTopic(topicIndex) {
        if (topicIndex >= 0 && topicIndex < this.topics.length) {
            this.currentTopic = this.topics[topicIndex];
            
            // 주제 변경 이벤트 발생
            this.triggerEvent('topicChanged', {
                topicIndex,
                topic: this.currentTopic
            });
            
            return {
                success: true,
                topic: this.currentTopic,
                message: '현재 주제가 변경되었습니다.'
            };
        }
        
        return {
            success: false,
            message: '유효하지 않은 주제 인덱스입니다.'
        };
    }

    // 아이디어 추가
    addIdea(participantId, ideaText) {
        if (!this.sessionActive) {
            return {
                success: false,
                message: '활성화된 세션이 없습니다.'
            };
        }
        
        if (!ideaText || ideaText.trim() === '') {
            return {
                success: false,
                message: '아이디어 내용이 비어있습니다.'
            };
        }
        
        // 참가자 확인
        const participant = this.participants.find(p => p.id === participantId);
        
        const idea = {
            id: 'idea_' + Date.now(),
            text: ideaText.trim(),
            topic: this.currentTopic,
            participantId,
            participantName: participant ? participant.name : '익명',
            timestamp: new Date().toISOString(),
            votes: 0,
            comments: []
        };
        
        this.ideas.push(idea);
        
        // 아이디어 추가 이벤트 발생
        this.triggerEvent('ideaAdded', { idea });
        
        return {
            success: true,
            idea,
            message: '아이디어가 추가되었습니다.'
        };
    }

    // 아이디어에 투표
    voteForIdea(participantId, ideaId) {
        if (!this.sessionActive) {
            return {
                success: false,
                message: '활성화된 세션이 없습니다.'
            };
        }
        
        // 이미 투표했는지 확인
        if (!this.votingResults[participantId]) {
            this.votingResults[participantId] = [];
        }
        
        if (this.votingResults[participantId].includes(ideaId)) {
            // 이미 투표한 경우 취소
            this.votingResults[participantId] = this.votingResults[participantId].filter(id => id !== ideaId);
            
            // 해당 아이디어 투표수 감소
            const idea = this.ideas.find(i => i.id === ideaId);
            if (idea) {
                idea.votes--;
                
                // 투표 취소 이벤트 발생
                this.triggerEvent('voteRemoved', { ideaId, participantId, idea });
                
                return {
                    success: true,
                    idea,
                    message: '투표가 취소되었습니다.'
                };
            }
        } else {
            // 새로운 투표
            this.votingResults[participantId].push(ideaId);
            
            // 해당 아이디어 투표수 증가
            const idea = this.ideas.find(i => i.id === ideaId);
            if (idea) {
                idea.votes++;
                
                // 투표 추가 이벤트 발생
                this.triggerEvent('voteAdded', { ideaId, participantId, idea });
                
                return {
                    success: true,
                    idea,
                    message: '투표가 추가되었습니다.'
                };
            }
        }
        
        return {
            success: false,
            message: '유효하지 않은 아이디어입니다.'
        };
    }

    // 아이디어에 댓글 추가
    addCommentToIdea(participantId, ideaId, commentText) {
        if (!this.sessionActive) {
            return {
                success: false,
                message: '활성화된 세션이 없습니다.'
            };
        }
        
        if (!commentText || commentText.trim() === '') {
            return {
                success: false,
                message: '댓글 내용이 비어있습니다.'
            };
        }
        
        // 해당 아이디어 찾기
        const idea = this.ideas.find(i => i.id === ideaId);
        if (!idea) {
            return {
                success: false,
                message: '유효하지 않은 아이디어입니다.'
            };
        }
        
        // 참가자 확인
        const participant = this.participants.find(p => p.id === participantId);
        
        // 댓글 추가
        const comment = {
            id: 'comment_' + Date.now(),
            text: commentText.trim(),
            participantId,
            participantName: participant ? participant.name : '익명',
            timestamp: new Date().toISOString()
        };
        
        idea.comments.push(comment);
        
        // 댓글 추가 이벤트 발생
        this.triggerEvent('commentAdded', { ideaId, comment, idea });
        
        return {
            success: true,
            idea,
            comment,
            message: '댓글이 추가되었습니다.'
        };
    }

    // 타이머 시작
    startTimer(minutes) {
        if (!this.sessionActive) {
            return {
                success: false,
                message: '활성화된 세션이 없습니다.'
            };
        }
        
        // 기존 타이머가 있으면 정지
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timerDuration = minutes * 60; // 초 단위로 변환
        this.timerRemaining = this.timerDuration;
        
        // 타이머 시작 이벤트
        this.triggerEvent('timerStarted', {
            duration: this.timerDuration,
            remaining: this.timerRemaining
        });
        
        // 1초마다 타이머 업데이트
        this.timer = setInterval(() => {
            this.timerRemaining--;
            
            // 타이머 업데이트 이벤트
            this.triggerEvent('timerUpdated', {
                remaining: this.timerRemaining
            });
            
            // 타이머 종료
            if (this.timerRemaining <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                
                // 타이머 종료 이벤트
                this.triggerEvent('timerEnded', {});
            }
        }, 1000);
        
        return {
            success: true,
            duration: this.timerDuration,
            message: `${minutes}분 타이머가 시작되었습니다.`
        };
    }

    // 세션 종료 및 결과 도출
    endSession() {
        if (!this.sessionActive) {
            return {
                success: false,
                message: '활성화된 세션이 없습니다.'
            };
        }
        
        // 타이머 정지
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.sessionActive = false;
        
        // 결과 분석
        const results = this.analyzeResults();
        
        // 세션 종료 이벤트 발생
        this.triggerEvent('sessionEnded', { results });
        
        return {
            success: true,
            results,
            message: '세션이 종료되었습니다.'
        };
    }

    // 세션 결과 분석
    analyzeResults() {
        // 주제별 아이디어 분류
        const topicIdeas = {};
        this.topics.forEach(topic => {
            topicIdeas[topic] = this.ideas.filter(idea => idea.topic === topic);
        });
        
        // 투표 상위 아이디어 추출
        const topIdeas = [...this.ideas].sort((a, b) => b.votes - a.votes).slice(0, 5);
        
        // 참가자별 기여도 분석
        const participantContributions = {};
        this.participants.forEach(participant => {
            const participantIdeas = this.ideas.filter(idea => idea.participantId === participant.id);
            
            // 댓글 횟수 계산
            let commentCount = 0;
            this.ideas.forEach(idea => {
                commentCount += idea.comments.filter(comment => comment.participantId === participant.id).length;
            });
            
            // 투표 횟수 계산
            const voteCount = this.votingResults[participant.id] ? this.votingResults[participant.id].length : 0;
            
            participantContributions[participant.id] = {
                name: participant.name,
                ideaCount: participantIdeas.length,
                commentCount,
                voteCount,
                totalContribution: participantIdeas.length + commentCount + voteCount
            };
        });
        
        // 전체 결과 구성
        return {
            sessionId: this.sessionId,
            sessionName: this.sessionName,
            topicIdeas,
            topIdeas,
            totalIdeas: this.ideas.length,
            totalVotes: Object.values(this.votingResults).reduce((total, votes) => total + votes.length, 0),
            participantContributions
        };
    }

    // 커스텀 이벤트 트리거
    triggerEvent(eventName, data) {
        const event = new CustomEvent('aiFacilitator:' + eventName, { detail: data });
        document.dispatchEvent(event);
    }
}

// 페이지 로드 시 AI 퍼실리테이터 객체 생성 및 UI 이벤트 연결
document.addEventListener('DOMContentLoaded', () => {
    // 전역 인스턴스 생성
    window.aiFacilitator = new AIFacilitator();
    
    // 필요한 UI 요소 초기화 및 이벤트 연결
    const sessionForm = document.getElementById('session-form');
    const ideaForm = document.getElementById('idea-form');
    const topicSelect = document.getElementById('topic-select');
    const ideasContainer = document.getElementById('ideas-container');
    const timerControls = document.getElementById('timer-controls');
    
    // 요소가 존재할 경우에만 이벤트 리스너 추가
    if (sessionForm) {
        sessionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const sessionName = document.getElementById('session-name').value;
            const participantsInput = document.getElementById('participants').value;
            const topicsInput = document.getElementById('topics').value;
            
            // 참가자 및 주제 파싱
            const participants = participantsInput.split(',').map((name, index) => ({
                id: 'participant_' + index,
                name: name.trim()
            }));
            
            const topics = topicsInput.split(',').map(topic => topic.trim());
            
            // 세션 초기화
            window.aiFacilitator.initSession(sessionName, participants, topics);
            
            // UI 업데이트
            document.getElementById('setup-panel').classList.add('hidden');
            document.getElementById('session-panel').classList.remove('hidden');
            
            // 토픽 선택 옵션 업데이트
            if (topicSelect) {
                topicSelect.innerHTML = '';
                topics.forEach((topic, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = topic;
                    topicSelect.appendChild(option);
                });
            }
        });
    }
    
    // 기타 이벤트 리스너 및 UI 업데이트 함수 구현...
}); 