// AI 시험관리 기능 구현
class AIExam {
    constructor() {
        this.apiEndpoint = 'https://api.core.ai/v1/exam';
        this.userId = null;
        this.exams = [];
        this.currentExam = null;
        this.examResults = [];
    }

    // 사용자 초기화
    initUser(userId) {
        this.userId = userId;
        this.loadExams();
        return {
            success: true,
            message: '사용자가 초기화되었습니다.'
        };
    }

    // 시험 목록 로드
    loadExams() {
        // 실제 구현에서는 API 호출
        // 여기서는 데모 데이터 사용
        this.exams = this.generateDemoExams();
        return {
            success: true,
            exams: this.exams,
            message: '시험 목록이 로드되었습니다.'
        };
    }

    // 데모 시험 생성
    generateDemoExams() {
        return [
            {
                id: 'exam_001',
                title: '프로그래밍 기초 개념 평가',
                description: '변수, 제어 구조, 함수 등 프로그래밍 기초 개념에 대한 이해도를 평가합니다.',
                category: '프로그래밍',
                level: '초급',
                questionCount: 10,
                estimatedTime: 20,
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                questions: this.generateProgrammingQuestions()
            },
            {
                id: 'exam_002',
                title: '데이터 구조와 알고리즘 기초',
                description: '기본적인 데이터 구조와 알고리즘에 대한 이해도를 평가합니다.',
                category: '컴퓨터 과학',
                level: '중급',
                questionCount: 8,
                estimatedTime: 30,
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                questions: this.generateAlgorithmQuestions()
            },
            {
                id: 'exam_003',
                title: '웹 개발 기초',
                description: 'HTML, CSS, JavaScript 기초 지식을 평가합니다.',
                category: '웹 개발',
                level: '초급',
                questionCount: 12,
                estimatedTime: 25,
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                questions: this.generateWebDevQuestions()
            }
        ];
    }

    // 프로그래밍 문제 생성
    generateProgrammingQuestions() {
        return [
            {
                id: 'q_001_01',
                type: 'multiple-choice',
                text: '다음 중 JavaScript에서 변수를 선언하는 키워드가 아닌 것은?',
                options: [
                    { id: 'a', text: 'var' },
                    { id: 'b', text: 'let' },
                    { id: 'c', text: 'const' },
                    { id: 'd', text: 'function' }
                ],
                correctAnswer: 'd',
                explanation: 'function은 함수를 선언하는 키워드이며, JavaScript에서 변수를 선언하는 키워드는 var, let, const입니다.'
            },
            {
                id: 'q_001_02',
                type: 'multiple-choice',
                text: '다음 코드의 출력값은?\n\nlet x = 5;\nlet y = "10";\nconsole.log(x + y);',
                options: [
                    { id: 'a', text: '15' },
                    { id: 'b', text: '"510"' },
                    { id: 'c', text: 'NaN' },
                    { id: 'd', text: '오류 발생' }
                ],
                correctAnswer: 'b',
                explanation: 'JavaScript에서는 숫자와 문자열을 더하면 숫자가 문자열로 변환되어 문자열 연결이 발생합니다. 따라서 5 + "10"은 "510"이 됩니다.'
            },
            {
                id: 'q_001_03',
                type: 'coding',
                text: '1부터 n까지의 합을 반환하는 함수를 작성하세요.',
                templateCode: 'function sum(n) {\n  // 코드를 작성하세요\n}',
                testCases: [
                    { input: 5, expected: 15 },
                    { input: 10, expected: 55 }
                ],
                solution: 'function sum(n) {\n  let result = 0;\n  for (let i = 1; i <= n; i++) {\n    result += i;\n  }\n  return result;\n}',
                explanation: '반복문을 사용하여 1부터 n까지의 모든 숫자를 더하는 간단한 방법입니다. 수학적으로는 n*(n+1)/2 공식을 사용할 수도 있습니다.'
            }
            // 나머지 문제는 생략
        ];
    }

    // 알고리즘 문제 생성
    generateAlgorithmQuestions() {
        return [
            {
                id: 'q_002_01',
                type: 'multiple-choice',
                text: '배열에서 요소를 찾는 이진 탐색(Binary Search)의 시간 복잡도는?',
                options: [
                    { id: 'a', text: 'O(1)' },
                    { id: 'b', text: 'O(n)' },
                    { id: 'c', text: 'O(log n)' },
                    { id: 'd', text: 'O(n log n)' }
                ],
                correctAnswer: 'c',
                explanation: '이진 탐색은 정렬된 배열에서 매 단계마다 탐색 범위를 절반으로 줄이는 알고리즘입니다. 따라서 시간 복잡도는 O(log n)입니다.'
            },
            {
                id: 'q_002_02',
                type: 'multiple-choice',
                text: '다음 중 스택(Stack)의 특성으로 올바른 것은?',
                options: [
                    { id: 'a', text: 'FIFO(First In First Out)' },
                    { id: 'b', text: 'LIFO(Last In First Out)' },
                    { id: 'c', text: '임의의 위치에 있는 요소에 직접 접근 가능' },
                    { id: 'd', text: '양쪽 끝에서 삽입과 삭제 가능' }
                ],
                correctAnswer: 'b',
                explanation: '스택은 LIFO(Last In First Out) 구조로, 가장 마지막에 들어온 요소가 가장 먼저 나가는 자료구조입니다.'
            }
            // 나머지 문제는 생략
        ];
    }

    // 웹 개발 문제 생성
    generateWebDevQuestions() {
        return [
            {
                id: 'q_003_01',
                type: 'multiple-choice',
                text: 'HTML에서 문단을 나타내는 태그는?',
                options: [
                    { id: 'a', text: '<paragraph>' },
                    { id: 'b', text: '<p>' },
                    { id: 'c', text: '<para>' },
                    { id: 'd', text: '<text>' }
                ],
                correctAnswer: 'b',
                explanation: '<p> 태그는 HTML에서 문단(paragraph)을 나타내는 표준 태그입니다.'
            },
            {
                id: 'q_003_02',
                type: 'multiple-choice',
                text: 'CSS에서 클래스 선택자는 어떤 기호로 시작하나요?',
                options: [
                    { id: 'a', text: '#' },
                    { id: 'b', text: '.' },
                    { id: 'c', text: '@' },
                    { id: 'd', text: '$' }
                ],
                correctAnswer: 'b',
                explanation: 'CSS에서 클래스 선택자는 .(점)으로 시작합니다. #은 ID 선택자를 나타냅니다.'
            }
            // 나머지 문제는 생략
        ];
    }

    // 시험 시작
    startExam(examId) {
        const exam = this.exams.find(e => e.id === examId);
        if (!exam) {
            return {
                success: false,
                message: '해당 시험을 찾을 수 없습니다.'
            };
        }

        // 사용자의 답변을 저장할 빈 배열 생성
        const userAnswers = exam.questions.map(q => ({
            questionId: q.id,
            answer: null,
            isCorrect: false,
            timeSpent: 0
        }));

        this.currentExam = {
            exam,
            startTime: new Date().toISOString(),
            userAnswers,
            currentQuestionIndex: 0,
            isCompleted: false
        };

        return {
            success: true,
            examInfo: {
                id: exam.id,
                title: exam.title,
                questionCount: exam.questionCount,
                currentQuestionIndex: 0
            },
            currentQuestion: this.getCurrentQuestion(),
            message: '시험이 시작되었습니다.'
        };
    }

    // 현재 문제 가져오기
    getCurrentQuestion() {
        if (!this.currentExam || this.currentExam.isCompleted) {
            return null;
        }

        const { exam, currentQuestionIndex, userAnswers } = this.currentExam;
        const question = exam.questions[currentQuestionIndex];

        // 민감한 정보 제외
        const { correctAnswer, solution, ...safeQuestion } = question;

        return {
            ...safeQuestion,
            currentIndex: currentQuestionIndex,
            totalQuestions: exam.questionCount,
            userAnswer: userAnswers[currentQuestionIndex].answer
        };
    }

    // 답변 제출
    submitAnswer(answer, timeSpent) {
        if (!this.currentExam || this.currentExam.isCompleted) {
            return {
                success: false,
                message: '진행 중인 시험이 없습니다.'
            };
        }

        const { exam, currentQuestionIndex, userAnswers } = this.currentExam;
        const question = exam.questions[currentQuestionIndex];

        // 사용자 답변 저장
        userAnswers[currentQuestionIndex].answer = answer;
        userAnswers[currentQuestionIndex].timeSpent = timeSpent;

        // 정답 여부 판단
        if (question.type === 'multiple-choice') {
            userAnswers[currentQuestionIndex].isCorrect = answer === question.correctAnswer;
        } else if (question.type === 'coding') {
            // 실제로는 서버에서 코드 실행 및 테스트 필요
            // 여기서는 간단히 처리
            userAnswers[currentQuestionIndex].isCorrect = this.evaluateCodingAnswer(answer, question);
        }

        // 다음 문제로 이동 또는 시험 완료
        if (currentQuestionIndex < exam.questions.length - 1) {
            this.currentExam.currentQuestionIndex++;
            return {
                success: true,
                nextQuestion: this.getCurrentQuestion(),
                message: '답변이 저장되었습니다.'
            };
        } else {
            // 시험 완료
            this.currentExam.isCompleted = true;
            this.currentExam.endTime = new Date().toISOString();

            // 결과 계산 및 저장
            const result = this.calculateExamResult();
            this.examResults.push(result);

            return {
                success: true,
                isCompleted: true,
                result,
                message: '모든 문제가 완료되었습니다.'
            };
        }
    }

    // 코딩 문제 평가 (간단한 구현)
    evaluateCodingAnswer(answer, question) {
        // 실제 구현에서는 서버에서 안전한 환경에서 코드 실행 필요
        // 여기서는 간단히 문자열 비교로 처리
        const normalizedAnswer = answer.replace(/\s+/g, '');
        const normalizedSolution = question.solution.replace(/\s+/g, '');
        return normalizedAnswer === normalizedSolution;
    }

    // 시험 결과 계산
    calculateExamResult() {
        if (!this.currentExam || !this.currentExam.isCompleted) {
            return null;
        }

        const { exam, userAnswers, startTime, endTime } = this.currentExam;
        
        // 정답 수 계산
        const correctCount = userAnswers.filter(a => a.isCorrect).length;
        
        // 점수 계산 (100점 만점)
        const score = Math.round((correctCount / exam.questions.length) * 100);
        
        // 소요 시간 계산 (분 단위)
        const duration = Math.round((new Date(endTime) - new Date(startTime)) / (1000 * 60));
        
        // 유형별 분석
        const analysis = {
            totalQuestions: exam.questions.length,
            correctCount,
            score,
            duration,
            categories: {},
            questionAnalysis: userAnswers.map((answer, index) => {
                const question = exam.questions[index];
                return {
                    questionId: question.id,
                    questionType: question.type,
                    isCorrect: answer.isCorrect,
                    timeSpent: answer.timeSpent
                };
            })
        };

        return {
            examId: exam.id,
            examTitle: exam.title,
            userId: this.userId,
            startTime,
            endTime,
            score,
            correctCount,
            totalQuestions: exam.questions.length,
            duration,
            analysis
        };
    }

    // 시험 결과 가져오기
    getExamResults() {
        return {
            success: true,
            results: this.examResults,
            count: this.examResults.length
        };
    }

    // 시험 결과 상세 보기
    getExamResultDetails(examId) {
        const result = this.examResults.find(r => r.examId === examId);
        if (!result) {
            return {
                success: false,
                message: '해당 시험 결과를 찾을 수 없습니다.'
            };
        }

        // 문제 정보 포함
        const exam = this.exams.find(e => e.id === examId);
        if (!exam) {
            return {
                success: false,
                message: '해당 시험 정보를 찾을 수 없습니다.'
            };
        }

        // 결과와 문제 정보 결합
        const detailedResult = {
            ...result,
            questions: exam.questions.map((question, index) => {
                const userAnswer = result.analysis.questionAnalysis[index];
                return {
                    ...question,
                    userAnswer: userAnswer.answer,
                    isCorrect: userAnswer.isCorrect,
                    timeSpent: userAnswer.timeSpent
                };
            })
        };

        return {
            success: true,
            result: detailedResult
        };
    }
}

// 페이지 로드 시 AI 시험 객체 생성 및 UI 이벤트 연결
document.addEventListener('DOMContentLoaded', () => {
    // 전역 인스턴스 생성
    window.aiExam = new AIExam();
    
    // 데모 사용자 ID로 초기화
    window.aiExam.initUser('demo_user_' + Date.now());
    
    // UI 초기화
    initExamUI();
});

// UI 초기화 함수
function initExamUI() {
    // 시험 목록 렌더링
    renderExamList();
    
    // 시험 시작 버튼 이벤트 리스너
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('start-exam-btn')) {
            const examId = e.target.getAttribute('data-exam-id');
            startSelectedExam(examId);
        }
    });
}

// 시험 목록 렌더링
function renderExamList() {
    const examListContainer = document.getElementById('exam-list');
    if (!examListContainer) return;
    
    examListContainer.innerHTML = '';
    
    window.aiExam.exams.forEach(exam => {
        const examCard = document.createElement('div');
        examCard.className = 'exam-card';
        examCard.innerHTML = `
            <h3>${exam.title}</h3>
            <p>${exam.description}</p>
            <div class="exam-meta">
                <span class="category">${exam.category}</span>
                <span class="level">${exam.level}</span>
                <span class="question-count">${exam.questionCount}문항</span>
                <span class="time">${exam.estimatedTime}분</span>
            </div>
            <button class="btn start-exam-btn" data-exam-id="${exam.id}">시험 시작</button>
        `;
        
        examListContainer.appendChild(examCard);
    });
}

// 선택한 시험 시작
function startSelectedExam(examId) {
    const result = window.aiExam.startExam(examId);
    
    if (result.success) {
        // 시험 목록 페이지 숨기기
        const examListSection = document.getElementById('exam-list-section');
        if (examListSection) {
            examListSection.classList.add('hidden');
        }
        
        // 시험 페이지 보이기
        const examSection = document.getElementById('exam-section');
        if (examSection) {
            examSection.classList.remove('hidden');
            
            // 현재 문제 렌더링
            renderCurrentQuestion(result.currentQuestion);
            
            // 시험 정보 표시
            const examInfo = document.getElementById('exam-info');
            if (examInfo) {
                examInfo.innerHTML = `
                    <h2>${result.examInfo.title}</h2>
                    <div class="progress-info">
                        <span class="question-progress">
                            문제 ${result.currentQuestion.currentIndex + 1} / ${result.examInfo.questionCount}
                        </span>
                    </div>
                `;
            }
        }
    } else {
        alert(result.message);
    }
}

// 현재 문제 렌더링
function renderCurrentQuestion(question) {
    const questionContainer = document.getElementById('question-container');
    if (!questionContainer) return;
    
    questionContainer.innerHTML = '';
    
    // 문제 정보
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = `
        <div class="question-text">${question.text}</div>
    `;
    
    // 문제 유형에 따른 UI 렌더링
    if (question.type === 'multiple-choice') {
        const optionsElement = document.createElement('div');
        optionsElement.className = 'options';
        
        question.options.forEach(option => {
            const isSelected = question.userAnswer === option.id;
            optionsElement.innerHTML += `
                <div class="option ${isSelected ? 'selected' : ''}">
                    <input type="radio" name="answer" id="option-${option.id}" value="${option.id}" ${isSelected ? 'checked' : ''}>
                    <label for="option-${option.id}">${option.text}</label>
                </div>
            `;
        });
        
        questionElement.appendChild(optionsElement);
    } else if (question.type === 'coding') {
        const codeElement = document.createElement('div');
        codeElement.className = 'code-editor';
        codeElement.innerHTML = `
            <textarea id="code-answer" rows="10" class="code-textarea">${question.templateCode}</textarea>
        `;
        
        questionElement.appendChild(codeElement);
    }
    
    // 제출 버튼
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn submit-answer-btn';
    submitBtn.textContent = '답변 제출';
    submitBtn.onclick = submitCurrentAnswer;
    
    questionContainer.appendChild(questionElement);
    questionContainer.appendChild(submitBtn);
}

// 현재 답변 제출
function submitCurrentAnswer() {
    const currentQuestion = window.aiExam.getCurrentQuestion();
    if (!currentQuestion) return;
    
    let answer = null;
    const timeSpent = 60; // 실제로는 타이머로 측정 필요
    
    if (currentQuestion.type === 'multiple-choice') {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            alert('답변을 선택해주세요.');
            return;
        }
        answer = selectedOption.value;
    } else if (currentQuestion.type === 'coding') {
        const codeAnswer = document.getElementById('code-answer');
        if (!codeAnswer || !codeAnswer.value.trim()) {
            alert('코드를 작성해주세요.');
            return;
        }
        answer = codeAnswer.value;
    }
    
    const result = window.aiExam.submitAnswer(answer, timeSpent);
    
    if (result.success) {
        if (result.isCompleted) {
            // 시험 완료 - 결과 페이지로 이동
            showExamResult(result.result);
        } else {
            // 다음 문제 렌더링
            renderCurrentQuestion(result.nextQuestion);
            
            // 진행 상황 업데이트
            const progressInfo = document.querySelector('.question-progress');
            if (progressInfo) {
                progressInfo.textContent = `문제 ${result.nextQuestion.currentIndex + 1} / ${result.nextQuestion.totalQuestions}`;
            }
        }
    } else {
        alert(result.message);
    }
}

// 시험 결과 표시
function showExamResult(result) {
    // 시험 페이지 숨기기
    const examSection = document.getElementById('exam-section');
    if (examSection) {
        examSection.classList.add('hidden');
    }
    
    // 결과 페이지 보이기
    const resultSection = document.getElementById('result-section');
    if (resultSection) {
        resultSection.classList.remove('hidden');
        
        // 결과 정보 렌더링
        const resultContainer = document.getElementById('result-container');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="result-header">
                    <h2>${result.examTitle} 결과</h2>
                    <div class="score-display">
                        <div class="score">${result.score}</div>
                        <div class="score-label">점수</div>
                    </div>
                </div>
                
                <div class="result-summary">
                    <div class="summary-item">
                        <div class="summary-value">${result.correctCount} / ${result.totalQuestions}</div>
                        <div class="summary-label">정답 수</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${result.duration}분</div>
                        <div class="summary-label">소요 시간</div>
                    </div>
                </div>
                
                <button class="btn back-to-list-btn">목록으로 돌아가기</button>
                <button class="btn view-detail-btn" data-exam-id="${result.examId}">상세 결과 보기</button>
            `;
            
            // 버튼 이벤트 리스너 추가
            const backBtn = resultContainer.querySelector('.back-to-list-btn');
            if (backBtn) {
                backBtn.addEventListener('click', function() {
                    // 목록 페이지로 돌아가기
                    resultSection.classList.add('hidden');
                    const examListSection = document.getElementById('exam-list-section');
                    if (examListSection) {
                        examListSection.classList.remove('hidden');
                    }
                });
            }
            
            const detailBtn = resultContainer.querySelector('.view-detail-btn');
            if (detailBtn) {
                detailBtn.addEventListener('click', function() {
                    const examId = this.getAttribute('data-exam-id');
                    showDetailedResult(examId);
                });
            }
        }
    }
}

// 상세 결과 보기
function showDetailedResult(examId) {
    const result = window.aiExam.getExamResultDetails(examId);
    
    if (result.success) {
        // 결과 페이지 숨기기
        const resultSection = document.getElementById('result-section');
        if (resultSection) {
            resultSection.classList.add('hidden');
        }
        
        // 상세 결과 페이지 보이기
        const detailSection = document.getElementById('detail-section');
        if (detailSection) {
            detailSection.classList.remove('hidden');
            
            // 상세 결과 렌더링
            const detailContainer = document.getElementById('detail-container');
            if (detailContainer) {
                detailContainer.innerHTML = `
                    <h2>${result.result.examTitle} 상세 결과</h2>
                    
                    <div class="questions-review">
                        <h3>문제 리뷰</h3>
                        <div id="questions-list"></div>
                    </div>
                    
                    <button class="btn back-to-results-btn">결과 페이지로 돌아가기</button>
                `;
                
                // 문제 리뷰 렌더링
                const questionsList = detailContainer.querySelector('#questions-list');
                if (questionsList && result.result.questions) {
                    result.result.questions.forEach((question, index) => {
                        const questionItem = document.createElement('div');
                        questionItem.className = `question-item ${question.isCorrect ? 'correct' : 'incorrect'}`;
                        
                        let questionContent = `
                            <div class="question-header">
                                <span class="question-number">문제 ${index + 1}</span>
                                <span class="result-badge ${question.isCorrect ? 'correct' : 'incorrect'}">
                                    ${question.isCorrect ? '정답' : '오답'}
                                </span>
                            </div>
                            <div class="question-text">${question.text}</div>
                        `;
                        
                        if (question.type === 'multiple-choice') {
                            questionContent += `<div class="options-review">`;
                            
                            question.options.forEach(option => {
                                const isUserAnswer = question.userAnswer === option.id;
                                const isCorrectAnswer = question.correctAnswer === option.id;
                                
                                questionContent += `
                                    <div class="option ${isUserAnswer ? 'user-selected' : ''} ${isCorrectAnswer ? 'correct-answer' : ''}">
                                        <span class="option-label">${option.id.toUpperCase()}</span>
                                        <span class="option-text">${option.text}</span>
                                        ${isCorrectAnswer ? '<span class="correct-mark">✓</span>' : ''}
                                        ${isUserAnswer && !isCorrectAnswer ? '<span class="incorrect-mark">✗</span>' : ''}
                                    </div>
                                `;
                            });
                            
                            questionContent += `</div>`;
                        } else if (question.type === 'coding') {
                            questionContent += `
                                <div class="coding-review">
                                    <h4>제출한 코드:</h4>
                                    <pre class="code-display">${question.userAnswer || '코드 없음'}</pre>
                                    
                                    <h4>모범 답안:</h4>
                                    <pre class="code-display">${question.solution}</pre>
                                </div>
                            `;
                        }
                        
                        questionContent += `
                            <div class="explanation">
                                <h4>해설:</h4>
                                <p>${question.explanation}</p>
                            </div>
                        `;
                        
                        questionItem.innerHTML = questionContent;
                        questionsList.appendChild(questionItem);
                    });
                }
                
                // 버튼 이벤트 리스너 추가
                const backBtn = detailContainer.querySelector('.back-to-results-btn');
                if (backBtn) {
                    backBtn.addEventListener('click', function() {
                        // 결과 페이지로 돌아가기
                        detailSection.classList.add('hidden');
                        const resultSection = document.getElementById('result-section');
                        if (resultSection) {
                            resultSection.classList.remove('hidden');
                        }
                    });
                }
            }
        }
    } else {
        alert(result.message);
    }
} 