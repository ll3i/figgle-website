// AI 비서 기능 구현
class AISecretary {
    constructor() {
        this.apiEndpoint = 'https://api.figgle.ai/v1/secretary'; // 실제 백엔드 API 엔드포인트로 변경 필요
        this.isRecording = false;
        this.recognitionActive = false;
        this.transcript = [];
        this.recognition = null;
        this.meetingTitle = '';
        this.meetingDate = new Date();
        this.participants = [];
        this.summaryData = null;
    }

    // 음성 인식 초기화
    initSpeechRecognition() {
        // 브라우저 음성 인식 API 사용
        // 실제 서비스에서는 서버 API 연동으로 고도화 필요
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'ko-KR';

            this.recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                // 음성 인식 결과 처리
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                        this.addTranscriptLine(finalTranscript, this.getRandomSpeaker());
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
            };

            this.recognition.onend = () => {
                if (this.isRecording) {
                    // 인식이 중단되었을 때 자동으로 재시작
                    this.recognition.start();
                }
            };

            this.recognition.onerror = (event) => {
                console.error('음성 인식 오류:', event.error);
                if (event.error === 'not-allowed') {
                    alert('마이크 액세스 권한이 필요합니다.');
                    this.stopRecording();
                }
            };
            
            return true;
        } else {
            console.error('이 브라우저는 음성 인식을 지원하지 않습니다.');
            return false;
        }
    }

    // 녹음 시작
    startRecording(meetingTitle = '', participants = []) {
        if (this.isRecording) {
            return { success: false, message: '이미 녹음 중입니다.' };
        }

        // 녹음 정보 설정
        this.meetingTitle = meetingTitle || '새 회의 ' + new Date().toLocaleString();
        this.meetingDate = new Date();
        this.participants = participants.length > 0 ? participants : ['참가자 1', '참가자 2', '참가자 3'];
        this.transcript = [];
        this.summaryData = null;

        // 음성 인식 초기화 및 시작
        const recognitionSupported = this.initSpeechRecognition();
        if (recognitionSupported) {
            try {
                this.recognition.start();
                this.isRecording = true;
                this.recognitionActive = true;
                
                // 시뮬레이션을 위한 자동 트랜스크립트 생성 (실제 구현에서는 제거)
                if (window.location.href.includes('demo.html')) {
                    this.startTranscriptSimulation();
                }
                
                return { success: true, message: '녹음이 시작되었습니다.' };
            } catch (error) {
                console.error('녹음 시작 오류:', error);
                return { success: false, message: '녹음을 시작할 수 없습니다: ' + error.message };
            }
        } else {
            // 음성 인식이 지원되지 않는 경우 시뮬레이션만 실행 (데모용)
            if (window.location.href.includes('demo.html')) {
                this.isRecording = true;
                this.startTranscriptSimulation();
                return { success: true, message: '데모 모드에서 녹음이 시작되었습니다.' };
            }
            return { success: false, message: '이 브라우저는 음성 인식을 지원하지 않습니다.' };
        }
    }

    // 녹음 중단
    stopRecording() {
        if (!this.isRecording) {
            return { success: false, message: '녹음 중이 아닙니다.' };
        }

        // 음성 인식 중지
        if (this.recognition && this.recognitionActive) {
            try {
                this.recognition.stop();
                this.recognitionActive = false;
            } catch (error) {
                console.error('음성 인식 중지 오류:', error);
            }
        }

        // 시뮬레이션 중지
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }

        this.isRecording = false;
        
        // 회의 요약 생성
        this.generateMeetingSummary();
        
        return { success: true, message: '녹음이 중지되었습니다.' };
    }

    // 트랜스크립트 라인 추가
    addTranscriptLine(text, speaker = null) {
        if (!text || text.trim() === '') return;
        
        // 스피커가 지정되지 않은 경우 랜덤하게 할당
        if (!speaker) {
            speaker = this.getRandomSpeaker();
        }
        
        const line = {
            id: Date.now(),
            speaker,
            text: text.trim(),
            timestamp: new Date().toISOString()
        };
        
        this.transcript.push(line);
        
        // UI 업데이트 이벤트 발생
        this.notifyTranscriptUpdated(line);
        
        return line;
    }

    // 트랜스크립트 업데이트 알림
    notifyTranscriptUpdated(line) {
        const event = new CustomEvent('transcriptUpdated', { detail: { line, transcript: this.transcript } });
        document.dispatchEvent(event);
    }

    // 랜덤 발화자 선택 (시뮬레이션용)
    getRandomSpeaker() {
        return this.participants[Math.floor(Math.random() * this.participants.length)];
    }

    // 트랜스크립트 시뮬레이션 시작 (데모용)
    startTranscriptSimulation() {
        const simulatedTranscripts = [
            { speaker: '김철수', text: '오늘 회의에서는 신규 프로젝트의 타임라인과 리소스 배분에 대해 논의해 보겠습니다.' },
            { speaker: '이영희', text: '네, 먼저 프로젝트 일정부터 검토해 볼까요? 현재 3개월 내에 완료해야 하는 상황입니다.' },
            { speaker: '박민준', text: '그 기간 내에 완료하려면 개발팀에 추가 인력이 필요할 것 같습니다. 현재 리소스로는 어렵습니다.' },
            { speaker: '최서연', text: '마케팅 준비도 병행해야 하는데, 예산 배분은 어떻게 되나요?' },
            { speaker: '김철수', text: '전체 예산은 5천만원이고, 개발에 60%, 마케팅에 30%, 기타 10%로 배분할 예정입니다.' },
            { speaker: '이영희', text: '개발 일정이 너무 촉박한데, 단계적 출시는 어떨까요? MVP부터 시작해서 점진적으로 기능을 추가하는 방식으로요.' },
            { speaker: '박민준', text: '좋은 제안입니다. 핵심 기능을 먼저 개발하고 나머지는 이후 업데이트로 진행하면 일정 압박이 줄어들 것 같습니다.' },
            { speaker: '최서연', text: '그럼 마케팅도 그에 맞춰 단계적으로 진행하겠습니다. 초기에는 핵심 타겟층에 집중하고요.' },
            { speaker: '김철수', text: '그럼 오늘 결정된 사항을 정리해 보겠습니다. 1) 단계적 출시 방식 채택, 2) 개발팀 인력 보강, 3) 예산 배분 비율 확정.' },
            { speaker: '이영희', text: '다음 회의까지 각자 담당 파트의 세부 계획을 준비해 오시면 좋겠습니다.' },
            { speaker: '김철수', text: '모두 고생하셨습니다. 다음 회의는 금요일 오후 2시에 진행하겠습니다.' }
        ];
        
        let index = 0;
        
        this.simulationInterval = setInterval(() => {
            if (!this.isRecording || index >= simulatedTranscripts.length) {
                clearInterval(this.simulationInterval);
                this.simulationInterval = null;
                
                // 모든 시뮬레이션이 끝나면 추가 랜덤 대화 생성
                if (this.isRecording && index >= simulatedTranscripts.length) {
                    this.generateRandomTranscripts();
                }
                return;
            }
            
            const item = simulatedTranscripts[index];
            this.addTranscriptLine(item.text, item.speaker);
            index++;
        }, 3000); // 3초마다 한 줄씩 추가
    }
    
    // 추가 랜덤 대화 생성 (시뮬레이션용)
    generateRandomTranscripts() {
        const randomPhrases = [
            '이 부분에 대해 좀 더 자세히 설명해 주실 수 있을까요?',
            '다음 단계로 넘어가기 전에 확인해야 할 사항이 있습니다.',
            '그 방안은 현실적으로 어려울 것 같습니다. 대안을 생각해 봐야겠습니다.',
            '지금까지 논의한 내용을 바탕으로 액션 아이템을 정리해 보겠습니다.',
            '다른 의견이 있으신 분 계신가요?',
            '제 생각에는 이 접근 방식이 더 효율적일 것 같습니다.',
            '일정상 제약이 있어서 우선순위를 정해야 할 것 같습니다.',
            '이 이슈는 오프라인에서 따로 논의하는 것이 좋겠습니다.',
            '중요한 포인트를 짚어주셨네요. 이 부분을 중점적으로 검토하겠습니다.'
        ];
        
        // 15초마다 랜덤 대화 추가
        this.randomTranscriptInterval = setInterval(() => {
            if (!this.isRecording) {
                clearInterval(this.randomTranscriptInterval);
                return;
            }
            
            const randomText = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
            const randomSpeaker = this.getRandomSpeaker();
            this.addTranscriptLine(randomText, randomSpeaker);
        }, 15000);
    }

    // 회의 요약 생성
    generateMeetingSummary() {
        if (this.transcript.length === 0) {
            return { success: false, message: '트랜스크립트가 없습니다.' };
        }
        
        // 실제 구현에서는 AI 모델을 통한 요약 처리
        // 여기서는 간단한 시뮬레이션
        
        // 주요 논의 사항 추출 (키워드 기반)
        const keywords = ['프로젝트', '예산', '일정', '개발', '마케팅', '리소스', '인력', '계획', '단계적', '출시'];
        const keyDiscussions = [];
        
        // 트랜스크립트에서 키워드 포함된 문장 추출
        this.transcript.forEach(line => {
            keywords.forEach(keyword => {
                if (line.text.includes(keyword) && !keyDiscussions.includes(line.text)) {
                    keyDiscussions.push(line.text);
                }
            });
        });
        
        // 결정 사항과 액션 아이템 추출 (키워드 기반)
        const decisions = [];
        const actionItems = [];
        
        this.transcript.forEach(line => {
            if (line.text.includes('결정') || line.text.includes('확정') || line.text.includes('채택')) {
                decisions.push(line.text);
            }
            
            if (line.text.includes('준비') || line.text.includes('해야') || line.text.includes('필요')) {
                const actionItem = {
                    description: line.text,
                    assignee: line.speaker,
                    dueDate: this.getRandomDueDate()
                };
                actionItems.push(actionItem);
            }
        });
        
        // 참석자별 발언 횟수 및 비율 계산
        const speakerStats = {};
        this.participants.forEach(participant => {
            speakerStats[participant] = 0;
        });
        
        this.transcript.forEach(line => {
            if (speakerStats[line.speaker] !== undefined) {
                speakerStats[line.speaker]++;
            }
        });
        
        // 요약 데이터 생성
        this.summaryData = {
            meetingTitle: this.meetingTitle,
            date: this.meetingDate,
            duration: Math.floor(Math.random() * 30 + 30) + '분', // 랜덤 지속 시간 (30~60분)
            participants: this.participants,
            keyDiscussions: keyDiscussions.slice(0, 3),
            decisions: decisions.length > 0 ? decisions : ['단계적 출시 방식 채택', '개발팀 인력 보강', '예산 배분 비율 확정'],
            actionItems: actionItems.length > 0 ? actionItems : [
                { description: '개발 세부 계획 수립', assignee: '박민준', dueDate: this.getRandomDueDate() },
                { description: '마케팅 전략 초안 작성', assignee: '최서연', dueDate: this.getRandomDueDate() },
                { description: '팀원 배정 검토', assignee: '이영희', dueDate: this.getRandomDueDate() }
            ],
            speakerStats
        };
        
        // 요약 데이터 업데이트 알림
        const event = new CustomEvent('summaryGenerated', { detail: { summary: this.summaryData } });
        document.dispatchEvent(event);
        
        return { success: true, summary: this.summaryData };
    }
    
    // 랜덤 마감일 생성 (시뮬레이션용)
    getRandomDueDate() {
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 7) + 1); // 1~7일 후
        return date.toLocaleDateString('ko-KR');
    }

    // 회의 기록 저장 (로컬 스토리지 활용)
    saveMeeting() {
        if (this.transcript.length === 0) {
            return { success: false, message: '저장할 회의 기록이 없습니다.' };
        }
        
        const meetingData = {
            id: Date.now(),
            title: this.meetingTitle,
            date: this.meetingDate.toISOString(),
            participants: this.participants,
            transcript: this.transcript,
            summary: this.summaryData
        };
        
        // 로컬 스토리지에 저장
        const savedMeetings = JSON.parse(localStorage.getItem('secretaryMeetings') || '[]');
        savedMeetings.push(meetingData);
        
        // 최대 10개의 회의만 저장
        if (savedMeetings.length > 10) {
            savedMeetings.shift();
        }
        
        localStorage.setItem('secretaryMeetings', JSON.stringify(savedMeetings));
        
        return { success: true, meetingId: meetingData.id };
    }

    // 저장된 회의 목록 불러오기
    loadMeetingsList() {
        const savedMeetings = JSON.parse(localStorage.getItem('secretaryMeetings') || '[]');
        return savedMeetings.map(meeting => ({
            id: meeting.id,
            title: meeting.title,
            date: meeting.date,
            participants: meeting.participants.length
        }));
    }

    // 특정 회의 상세 정보 불러오기
    loadMeetingDetails(meetingId) {
        const savedMeetings = JSON.parse(localStorage.getItem('secretaryMeetings') || '[]');
        const meeting = savedMeetings.find(m => m.id === meetingId);
        
        if (meeting) {
            return { success: true, meeting };
        }
        
        return { success: false, message: '회의를 찾을 수 없습니다.' };
    }
}

// 전역 변수로 AI 비서 인스턴스 생성
const aiSecretary = new AISecretary();

// 페이지 로드 시 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    // AI 비서 기능 초기화 (데모 페이지에서만 실행)
    const startRecordingBtn = document.getElementById('start-recording');
    const stopRecordingBtn = document.getElementById('stop-recording');
    const recordingStatus = document.getElementById('recording-status');
    const recordingText = document.getElementById('recording-text');
    const transcriptContainer = document.getElementById('transcript');
    
    if (startRecordingBtn && stopRecordingBtn && transcriptContainer) {
        // 녹음 시작 버튼 클릭 이벤트
        startRecordingBtn.addEventListener('click', function() {
            const response = aiSecretary.startRecording();
            
            if (response.success) {
                this.disabled = true;
                stopRecordingBtn.disabled = false;
                recordingStatus.classList.add('recording');
                recordingText.textContent = '녹음 중...';
            } else {
                alert(response.message);
            }
        });
        
        // 녹음 중지 버튼 클릭 이벤트
        stopRecordingBtn.addEventListener('click', function() {
            const response = aiSecretary.stopRecording();
            
            if (response.success) {
                this.disabled = true;
                startRecordingBtn.disabled = false;
                recordingStatus.classList.remove('recording');
                recordingText.textContent = '완료됨';
                
                // 회의 저장
                aiSecretary.saveMeeting();
            } else {
                alert(response.message);
            }
        });
        
        // 트랜스크립트 업데이트 이벤트 리스너
        document.addEventListener('transcriptUpdated', function(e) {
            const line = e.detail.line;
            
            // 트랜스크립트 라인 추가
            const newLine = document.createElement('div');
            newLine.classList.add('transcript-line');
            newLine.innerHTML = `<span class="speaker">${line.speaker}:</span> ${line.text}`;
            transcriptContainer.appendChild(newLine);
            transcriptContainer.scrollTop = transcriptContainer.scrollHeight;
        });
        
        // 요약 생성 이벤트 리스너
        document.addEventListener('summaryGenerated', function(e) {
            const summary = e.detail.summary;
            
            // 요약 섹션 업데이트
            const summaryContent = document.querySelector('.summary-content');
            if (summaryContent) {
                let actionItemsHTML = '<ul>';
                summary.actionItems.forEach(item => {
                    actionItemsHTML += `<li>${item.assignee}: ${item.description} (마감: ${item.dueDate})</li>`;
                });
                actionItemsHTML += '</ul>';
                
                summaryContent.innerHTML = `
                    <p><strong>주요 논의 사항:</strong> ${summary.keyDiscussions.join(', ')}</p>
                    <p><strong>결정 사항:</strong> ${summary.decisions.join(', ')}</p>
                    <p><strong>액션 아이템:</strong></p>
                    ${actionItemsHTML}
                `;
            }
        });
    }
}); 