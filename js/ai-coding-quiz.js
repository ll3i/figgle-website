// AI 코딩 퀴즈 기능 구현
class AICodingQuiz {
    constructor() {
        this.apiEndpoint = 'https://api.core.ai/v1/coding-quiz';
        this.userId = null;
        this.quizzes = [];
        this.currentQuiz = null;
        this.submissions = [];
        this.languages = ['javascript', 'python', 'java', 'cpp'];
    }

    // 사용자 초기화
    initUser(userId) {
        this.userId = userId;
        this.loadQuizzes();
        return {
            success: true,
            message: '사용자가 초기화되었습니다.'
        };
    }

    // 퀴즈 목록 로드
    loadQuizzes() {
        // 실제 구현에서는 API 호출
        // 여기서는 데모 데이터 사용
        this.quizzes = this.generateDemoQuizzes();
        return {
            success: true,
            quizzes: this.quizzes,
            message: '퀴즈 목록이 로드되었습니다.'
        };
    }

    // 데모 퀴즈 생성
    generateDemoQuizzes() {
        return [
            {
                id: 'quiz_001',
                title: '문자열 뒤집기',
                description: '주어진 문자열을 뒤집는 함수를 작성하세요.',
                difficulty: '초급',
                category: '문자열 처리',
                expectedTime: 10,
                languages: ['javascript', 'python', 'java'],
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                templates: {
                    javascript: 'function reverseString(str) {\n  // 코드를 작성하세요\n}',
                    python: 'def reverse_string(str):\n    # 코드를 작성하세요\n    pass',
                    java: 'public class Solution {\n    public String reverseString(String str) {\n        // 코드를 작성하세요\n        return null;\n    }\n}'
                },
                testCases: [
                    { input: '"hello"', expected: '"olleh"', isHidden: false },
                    { input: '"Co:Re"', expected: '"eR:oC"', isHidden: false },
                    { input: '"a"', expected: '"a"', isHidden: false },
                    { input: '""', expected: '""', isHidden: false },
                    { input: '"Hello World!"', expected: '"!dlroW olleH"', isHidden: true }
                ],
                solutions: {
                    javascript: 'function reverseString(str) {\n  return str.split("").reverse().join("");\n}',
                    python: 'def reverse_string(str):\n    return str[::-1]',
                    java: 'public class Solution {\n    public String reverseString(String str) {\n        return new StringBuilder(str).reverse().toString();\n    }\n}'
                },
                hints: [
                    '문자열을 개별 문자로 분리하는 방법을 생각해보세요.',
                    '많은 언어에서 문자열 뒤집기를 위한 내장 함수나 메서드를 제공합니다.',
                    '문자열을 배열로 변환하고 순서를 뒤집은 후 다시 문자열로 결합할 수 있습니다.'
                ]
            },
            {
                id: 'quiz_002',
                title: '숫자의 합계 구하기',
                description: '1부터 n까지의 모든 숫자의 합을 구하는 함수를 작성하세요.',
                difficulty: '초급',
                category: '기본 알고리즘',
                expectedTime: 5,
                languages: ['javascript', 'python', 'java', 'cpp'],
                createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
                templates: {
                    javascript: 'function sumToN(n) {\n  // 코드를 작성하세요\n}',
                    python: 'def sum_to_n(n):\n    # 코드를 작성하세요\n    pass',
                    java: 'public class Solution {\n    public int sumToN(int n) {\n        // 코드를 작성하세요\n        return 0;\n    }\n}',
                    cpp: 'int sumToN(int n) {\n    // 코드를 작성하세요\n    return 0;\n}'
                },
                testCases: [
                    { input: '5', expected: '15', isHidden: false },
                    { input: '10', expected: '55', isHidden: false },
                    { input: '1', expected: '1', isHidden: false },
                    { input: '100', expected: '5050', isHidden: true }
                ],
                solutions: {
                    javascript: 'function sumToN(n) {\n  return (n * (n + 1)) / 2;\n}',
                    python: 'def sum_to_n(n):\n    return (n * (n + 1)) // 2',
                    java: 'public class Solution {\n    public int sumToN(int n) {\n        return (n * (n + 1)) / 2;\n    }\n}',
                    cpp: 'int sumToN(int n) {\n    return (n * (n + 1)) / 2;\n}'
                },
                hints: [
                    '반복문을 사용해 각 숫자를 더할 수 있습니다.',
                    '수학적 공식을 활용하면 더 효율적인 해결책을 찾을 수 있습니다.',
                    '가우스 공식: 1부터 n까지의 합은 n*(n+1)/2입니다.'
                ]
            },
            {
                id: 'quiz_003',
                title: '소수 판별하기',
                description: '주어진 숫자가 소수인지 판별하는 함수를 작성하세요.',
                difficulty: '중급',
                category: '수학',
                expectedTime: 15,
                languages: ['javascript', 'python', 'java'],
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                templates: {
                    javascript: 'function isPrime(n) {\n  // 코드를 작성하세요\n}',
                    python: 'def is_prime(n):\n    # 코드를 작성하세요\n    pass',
                    java: 'public class Solution {\n    public boolean isPrime(int n) {\n        // 코드를 작성하세요\n        return false;\n    }\n}'
                },
                testCases: [
                    { input: '2', expected: 'true', isHidden: false },
                    { input: '7', expected: 'true', isHidden: false },
                    { input: '4', expected: 'false', isHidden: false },
                    { input: '1', expected: 'false', isHidden: false },
                    { input: '997', expected: 'true', isHidden: true }
                ],
                solutions: {
                    javascript: 'function isPrime(n) {\n  if (n <= 1) return false;\n  if (n <= 3) return true;\n  \n  if (n % 2 === 0 || n % 3 === 0) return false;\n  \n  for (let i = 5; i * i <= n; i += 6) {\n    if (n % i === 0 || n % (i + 2) === 0) return false;\n  }\n  \n  return true;\n}',
                    python: 'def is_prime(n):\n    if n <= 1:\n        return False\n    if n <= 3:\n        return True\n    \n    if n % 2 == 0 or n % 3 == 0:\n        return False\n    \n    i = 5\n    while i * i <= n:\n        if n % i == 0 or n % (i + 2) == 0:\n            return False\n        i += 6\n    \n    return True',
                    java: 'public class Solution {\n    public boolean isPrime(int n) {\n        if (n <= 1) return false;\n        if (n <= 3) return true;\n        \n        if (n % 2 == 0 || n % 3 == 0) return false;\n        \n        for (int i = 5; i * i <= n; i += 6) {\n            if (n % i == 0 || n % (i + 2) == 0) return false;\n        }\n        \n        return true;\n    }\n}'
                },
                hints: [
                    '소수는 1과 자기 자신으로만 나누어지는 숫자입니다.',
                    '모든 숫자를 확인할 필요는 없습니다. 제곱근까지만 확인하면 됩니다.',
                    '2와 3의 배수를 먼저 처리하고, 이후 6k±1 형태의 숫자만 확인하면 효율적입니다.'
                ]
            }
        ];
    }

    // 퀴즈 시작
    startQuiz(quizId, language) {
        const quiz = this.quizzes.find(q => q.id === quizId);
        if (!quiz) {
            return {
                success: false,
                message: '해당 퀴즈를 찾을 수 없습니다.'
            };
        }

        if (!quiz.languages.includes(language)) {
            return {
                success: false,
                message: '선택한 언어를 지원하지 않습니다.'
            };
        }

        this.currentQuiz = {
            quiz,
            language,
            code: quiz.templates[language],
            startTime: new Date().toISOString(),
            isCompleted: false,
            testResults: null
        };

        return {
            success: true,
            quizInfo: {
                id: quiz.id,
                title: quiz.title,
                description: quiz.description,
                difficulty: quiz.difficulty,
                language,
                templateCode: quiz.templates[language]
            },
            message: '퀴즈가 시작되었습니다.'
        };
    }

    // 코드 저장
    saveCode(code) {
        if (!this.currentQuiz) {
            return {
                success: false,
                message: '진행 중인 퀴즈가 없습니다.'
            };
        }

        this.currentQuiz.code = code;
        
        return {
            success: true,
            message: '코드가 저장되었습니다.'
        };
    }

    // 코드 실행 및 테스트
    runCode(code = null) {
        if (!this.currentQuiz) {
            return {
                success: false,
                message: '진행 중인 퀴즈가 없습니다.'
            };
        }

        if (code) {
            this.currentQuiz.code = code;
        }

        // 실제 구현에서는 서버에서 코드 실행 필요
        // 여기서는 간단히 시뮬레이션
        
        const { quiz, language, code: userCode } = this.currentQuiz;
        const visibleTestCases = quiz.testCases.filter(tc => !tc.isHidden);
        
        // 테스트 결과 시뮬레이션
        const testResults = this.simulateCodeExecution(userCode, language, visibleTestCases);
        
        return {
            success: true,
            testResults,
            message: '코드가 실행되었습니다.'
        };
    }

    // 코드 제출
    submitCode(code = null) {
        if (!this.currentQuiz) {
            return {
                success: false,
                message: '진행 중인 퀴즈가 없습니다.'
            };
        }

        if (code) {
            this.currentQuiz.code = code;
        }

        const { quiz, language, code: userCode, startTime } = this.currentQuiz;
        
        // 모든 테스트 케이스로 실행
        const testResults = this.simulateCodeExecution(userCode, language, quiz.testCases);
        
        // 제출 결과 저장
        const allPassed = testResults.every(result => result.passed);
        const endTime = new Date().toISOString();
        const duration = Math.round((new Date(endTime) - new Date(startTime)) / 1000);
        
        const submission = {
            id: 'submission_' + Date.now(),
            quizId: quiz.id,
            userId: this.userId,
            language,
            code: userCode,
            testResults,
            isPassed: allPassed,
            score: Math.round((testResults.filter(r => r.passed).length / testResults.length) * 100),
            startTime,
            endTime,
            duration
        };
        
        this.submissions.push(submission);
        this.currentQuiz.isCompleted = true;
        this.currentQuiz.testResults = testResults;
        
        return {
            success: true,
            submission,
            message: allPassed ? '모든 테스트를 통과했습니다!' : '일부 테스트가 실패했습니다.'
        };
    }

    // 코드 실행 시뮬레이션
    simulateCodeExecution(code, language, testCases) {
        // 실제 구현에서는 서버에서 안전한 환경에서 코드 실행 필요
        // 여기서는 간단히 시뮬레이션
        
        // 솔루션 코드와 유사도 계산하여 결과 시뮬레이션
        const solution = this.currentQuiz.quiz.solutions[language];
        const similarity = this.calculateCodeSimilarity(code, solution);
        
        return testCases.map((testCase, index) => {
            // 간단한 시뮬레이션: 솔루션과 유사도가 높거나 랜덤 확률로 통과
            const random = Math.random();
            const passed = similarity > 0.7 || random > 0.3;
            
            // 실패한 경우 오류 메시지 생성
            let error = null;
            if (!passed) {
                const errorTypes = [
                    '타입 오류: 예상된 반환 타입이 아닙니다.',
                    '값 오류: 예상된 결과가 반환되지 않았습니다.',
                    '런타임 오류: 코드 실행 중 예외가 발생했습니다.',
                    '시간 초과: 코드 실행 시간이 제한을 초과했습니다.'
                ];
                error = errorTypes[Math.floor(Math.random() * errorTypes.length)];
            }
            
            return {
                testCaseIndex: index,
                input: testCase.input,
                expected: testCase.expected,
                actual: passed ? testCase.expected : '출력 값이 다릅니다',
                passed,
                error
            };
        });
    }

    // 코드 유사도 계산 (간단한 구현)
    calculateCodeSimilarity(code1, code2) {
        // 실제 구현에서는 더 복잡한 알고리즘 필요
        // 여기서는 간단히 문자열 길이 비율로 시뮬레이션
        const normalizedCode1 = code1.replace(/\s+/g, '');
        const normalizedCode2 = code2.replace(/\s+/g, '');
        
        const maxLength = Math.max(normalizedCode1.length, normalizedCode2.length);
        const minLength = Math.min(normalizedCode1.length, normalizedCode2.length);
        
        return minLength / maxLength;
    }

    // 힌트 가져오기
    getHint(hintIndex) {
        if (!this.currentQuiz) {
            return {
                success: false,
                message: '진행 중인 퀴즈가 없습니다.'
            };
        }

        const { quiz } = this.currentQuiz;
        
        if (hintIndex >= quiz.hints.length) {
            return {
                success: false,
                message: '해당 힌트가 없습니다.'
            };
        }
        
        return {
            success: true,
            hint: quiz.hints[hintIndex],
            remainingHints: quiz.hints.length - hintIndex - 1
        };
    }

    // 제출 기록 가져오기
    getSubmissions(quizId = null) {
        if (quizId) {
            const filteredSubmissions = this.submissions.filter(s => s.quizId === quizId);
            return {
                success: true,
                submissions: filteredSubmissions,
                count: filteredSubmissions.length
            };
        }
        
        return {
            success: true,
            submissions: this.submissions,
            count: this.submissions.length
        };
    }

    // 솔루션 보기
    getSolution() {
        if (!this.currentQuiz) {
            return {
                success: false,
                message: '진행 중인 퀴즈가 없습니다.'
            };
        }

        // 솔루션은 퀴즈를 완료한 후에만 볼 수 있음
        if (!this.currentQuiz.isCompleted) {
            return {
                success: false,
                message: '퀴즈를 완료한 후에만 솔루션을 볼 수 있습니다.'
            };
        }
        
        const { quiz, language } = this.currentQuiz;
        
        return {
            success: true,
            solution: quiz.solutions[language],
            message: '솔루션이 제공되었습니다.'
        };
    }
}

// 페이지 로드 시 AI 코딩 퀴즈 객체 생성 및 UI 이벤트 연결
document.addEventListener('DOMContentLoaded', () => {
    // 전역 인스턴스 생성
    window.aiCodingQuiz = new AICodingQuiz();
    
    // 데모 사용자 ID로 초기화
    window.aiCodingQuiz.initUser('demo_user_' + Date.now());
    
    // UI 초기화
    initQuizUI();
});

// UI 초기화 함수
function initQuizUI() {
    // 퀴즈 목록 렌더링
    renderQuizList();
    
    // 언어 선택 드롭다운 이벤트 리스너
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedQuizCard = document.querySelector('.quiz-card.selected');
            if (selectedQuizCard) {
                const quizId = selectedQuizCard.getAttribute('data-quiz-id');
                updateStartButtonState(quizId, this.value);
            }
        });
    }
    
    // 퀴즈 시작 버튼 이벤트 리스너
    const startButton = document.getElementById('start-quiz-btn');
    if (startButton) {
        startButton.addEventListener('click', function() {
            const selectedQuizCard = document.querySelector('.quiz-card.selected');
            const languageSelect = document.getElementById('language-select');
            
            if (selectedQuizCard && languageSelect && languageSelect.value) {
                const quizId = selectedQuizCard.getAttribute('data-quiz-id');
                const language = languageSelect.value;
                startSelectedQuiz(quizId, language);
            } else {
                alert('퀴즈와 언어를 선택해주세요.');
            }
        });
    }
}

// 퀴즈 목록 렌더링
function renderQuizList() {
    const quizListContainer = document.getElementById('quiz-list');
    if (!quizListContainer) return;
    
    quizListContainer.innerHTML = '';
    
    window.aiCodingQuiz.quizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.className = 'quiz-card';
        quizCard.setAttribute('data-quiz-id', quiz.id);
        quizCard.innerHTML = `
            <h3>${quiz.title}</h3>
            <p>${quiz.description}</p>
            <div class="quiz-meta">
                <span class="difficulty ${quiz.difficulty.toLowerCase()}">${quiz.difficulty}</span>
                <span class="category">${quiz.category}</span>
                <span class="time"><i class="fas fa-clock"></i> ${quiz.expectedTime}분</span>
            </div>
            <div class="languages">
                ${quiz.languages.map(lang => `<span class="language ${lang}">${lang}</span>`).join('')}
            </div>
        `;
        
        // 퀴즈 카드 클릭 이벤트
        quizCard.addEventListener('click', function() {
            // 기존 선택 해제
            document.querySelectorAll('.quiz-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // 현재 카드 선택
            this.classList.add('selected');
            
            // 언어 선택 드롭다운 업데이트
            updateLanguageOptions(quiz.languages);
            
            // 시작 버튼 상태 업데이트
            const languageSelect = document.getElementById('language-select');
            if (languageSelect) {
                updateStartButtonState(quiz.id, languageSelect.value);
            }
        });
        
        quizListContainer.appendChild(quizCard);
    });
}

// 언어 옵션 업데이트
function updateLanguageOptions(languages) {
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) return;
    
    languageSelect.innerHTML = '<option value="">언어 선택</option>';
    
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang.charAt(0).toUpperCase() + lang.slice(1); // 첫 글자 대문자
        languageSelect.appendChild(option);
    });
    
    languageSelect.disabled = false;
}

// 시작 버튼 상태 업데이트
function updateStartButtonState(quizId, language) {
    const startButton = document.getElementById('start-quiz-btn');
    if (!startButton) return;
    
    if (quizId && language) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
}

// 선택한 퀴즈 시작
function startSelectedQuiz(quizId, language) {
    const result = window.aiCodingQuiz.startQuiz(quizId, language);
    
    if (result.success) {
        // 퀴즈 목록 페이지 숨기기
        const quizListSection = document.getElementById('quiz-list-section');
        if (quizListSection) {
            quizListSection.classList.add('hidden');
        }
        
        // 코딩 페이지 보이기
        const codingSection = document.getElementById('coding-section');
        if (codingSection) {
            codingSection.classList.remove('hidden');
            
            // 퀴즈 정보 업데이트
            const quizInfoElement = document.getElementById('quiz-info');
            if (quizInfoElement) {
                quizInfoElement.innerHTML = `
                    <h2>${result.quizInfo.title}</h2>
                    <p>${result.quizInfo.description}</p>
                    <div class="quiz-meta">
                        <span class="difficulty ${result.quizInfo.difficulty.toLowerCase()}">${result.quizInfo.difficulty}</span>
                        <span class="language ${result.quizInfo.language}">${result.quizInfo.language}</span>
                    </div>
                `;
            }
            
            // 코드 에디터 초기화
            const codeEditor = document.getElementById('code-editor');
            if (codeEditor) {
                codeEditor.value = result.quizInfo.templateCode;
            }
            
            // 테스트 케이스 표시
            renderTestCases();
        }
    } else {
        alert(result.message);
    }
}

// 테스트 케이스 렌더링
function renderTestCases() {
    const testCasesContainer = document.getElementById('test-cases');
    if (!testCasesContainer || !window.aiCodingQuiz.currentQuiz) return;
    
    testCasesContainer.innerHTML = '';
    
    const visibleTestCases = window.aiCodingQuiz.currentQuiz.quiz.testCases.filter(tc => !tc.isHidden);
    
    visibleTestCases.forEach((testCase, index) => {
        const testCaseElement = document.createElement('div');
        testCaseElement.className = 'test-case';
        testCaseElement.innerHTML = `
            <div class="test-case-header">
                <span class="test-number">테스트 케이스 ${index + 1}</span>
                <span class="test-status" id="test-status-${index}">미실행</span>
            </div>
            <div class="test-case-body">
                <div class="test-input">
                    <span class="label">입력:</span>
                    <pre>${testCase.input}</pre>
                </div>
                <div class="test-expected">
                    <span class="label">예상 출력:</span>
                    <pre>${testCase.expected}</pre>
                </div>
                <div class="test-actual hidden" id="test-actual-${index}">
                    <span class="label">실제 출력:</span>
                    <pre></pre>
                </div>
                <div class="test-error hidden" id="test-error-${index}">
                    <span class="label">오류:</span>
                    <pre></pre>
                </div>
            </div>
        `;
        
        testCasesContainer.appendChild(testCaseElement);
    });
    
    // 실행 버튼 이벤트 리스너
    const runButton = document.getElementById('run-code-btn');
    if (runButton) {
        runButton.addEventListener('click', runCode);
    }
    
    // 제출 버튼 이벤트 리스너
    const submitButton = document.getElementById('submit-code-btn');
    if (submitButton) {
        submitButton.addEventListener('click', submitCode);
    }
    
    // 힌트 버튼 이벤트 리스너
    const hintButton = document.getElementById('hint-btn');
    if (hintButton) {
        hintButton.addEventListener('click', getHint);
    }
}

// 코드 실행
function runCode() {
    const codeEditor = document.getElementById('code-editor');
    if (!codeEditor) return;
    
    const code = codeEditor.value;
    const result = window.aiCodingQuiz.runCode(code);
    
    if (result.success) {
        updateTestResults(result.testResults);
    } else {
        alert(result.message);
    }
}

// 코드 제출
function submitCode() {
    const codeEditor = document.getElementById('code-editor');
    if (!codeEditor) return;
    
    const code = codeEditor.value;
    const result = window.aiCodingQuiz.submitCode(code);
    
    if (result.success) {
        updateTestResults(result.testResults);
        
        // 결과 메시지 표시
        const resultMessage = document.createElement('div');
        resultMessage.className = `submission-result ${result.submission.isPassed ? 'success' : 'failure'}`;
        resultMessage.innerHTML = `
            <h3>${result.submission.isPassed ? '성공!' : '실패!'}</h3>
            <p>${result.message}</p>
            <div class="result-details">
                <div class="result-item">
                    <span class="label">점수:</span>
                    <span class="value">${result.submission.score}%</span>
                </div>
                <div class="result-item">
                    <span class="label">소요 시간:</span>
                    <span class="value">${result.submission.duration}초</span>
                </div>
            </div>
            <div class="result-actions">
                <button id="show-solution-btn" class="btn">솔루션 보기</button>
                <button id="back-to-list-btn" class="btn">목록으로 돌아가기</button>
            </div>
        `;
        
        const codingSection = document.getElementById('coding-section');
        if (codingSection) {
            codingSection.appendChild(resultMessage);
            
            // 솔루션 버튼 이벤트 리스너
            const solutionButton = document.getElementById('show-solution-btn');
            if (solutionButton) {
                solutionButton.addEventListener('click', showSolution);
            }
            
            // 목록 버튼 이벤트 리스너
            const backButton = document.getElementById('back-to-list-btn');
            if (backButton) {
                backButton.addEventListener('click', function() {
                    // 결과 메시지 제거
                    resultMessage.remove();
                    
                    // 코딩 페이지 숨기기
                    codingSection.classList.add('hidden');
                    
                    // 퀴즈 목록 페이지 보이기
                    const quizListSection = document.getElementById('quiz-list-section');
                    if (quizListSection) {
                        quizListSection.classList.remove('hidden');
                    }
                });
            }
        }
    } else {
        alert(result.message);
    }
}

// 테스트 결과 업데이트
function updateTestResults(testResults) {
    testResults.forEach((result, index) => {
        const statusElement = document.getElementById(`test-status-${index}`);
        const actualElement = document.getElementById(`test-actual-${index}`);
        const errorElement = document.getElementById(`test-error-${index}`);
        
        if (statusElement) {
            statusElement.textContent = result.passed ? '통과' : '실패';
            statusElement.className = `test-status ${result.passed ? 'passed' : 'failed'}`;
        }
        
        if (actualElement) {
            actualElement.classList.remove('hidden');
            const preElement = actualElement.querySelector('pre');
            if (preElement) {
                preElement.textContent = result.actual;
            }
        }
        
        if (errorElement && result.error) {
            errorElement.classList.remove('hidden');
            const preElement = errorElement.querySelector('pre');
            if (preElement) {
                preElement.textContent = result.error;
            }
        } else if (errorElement) {
            errorElement.classList.add('hidden');
        }
    });
}

// 힌트 가져오기
function getHint() {
    const hintIndex = parseInt(document.getElementById('hint-btn').getAttribute('data-hint-index') || '0');
    const result = window.aiCodingQuiz.getHint(hintIndex);
    
    if (result.success) {
        const hintContainer = document.getElementById('hint-container');
        if (hintContainer) {
            // 기존 힌트 표시 여부 확인
            const existingHint = hintContainer.querySelector('.hint');
            
            // 새 힌트 생성
            const hintElement = document.createElement('div');
            hintElement.className = 'hint';
            hintElement.innerHTML = `
                <div class="hint-header">
                    <span>힌트 ${hintIndex + 1}</span>
                </div>
                <div class="hint-content">
                    <p>${result.hint}</p>
                </div>
            `;
            
            // 힌트 추가
            if (existingHint) {
                hintContainer.appendChild(hintElement);
            } else {
                hintContainer.innerHTML = '';
                hintContainer.appendChild(hintElement);
            }
            
            // 힌트 버튼 업데이트
            const hintButton = document.getElementById('hint-btn');
            if (hintButton) {
                if (result.remainingHints > 0) {
                    hintButton.setAttribute('data-hint-index', (hintIndex + 1).toString());
                    hintButton.textContent = `다음 힌트 보기 (${result.remainingHints}개 남음)`;
                } else {
                    hintButton.disabled = true;
                    hintButton.textContent = '더 이상 힌트가 없습니다';
                }
            }
        }
    } else {
        alert(result.message);
    }
}

// 솔루션 보기
function showSolution() {
    const result = window.aiCodingQuiz.getSolution();
    
    if (result.success) {
        const solutionContainer = document.getElementById('solution-container');
        if (solutionContainer) {
            solutionContainer.classList.remove('hidden');
            
            const solutionContent = document.createElement('div');
            solutionContent.className = 'solution-content';
            solutionContent.innerHTML = `
                <h3>모범 답안</h3>
                <pre class="solution-code">${result.solution}</pre>
            `;
            
            solutionContainer.innerHTML = '';
            solutionContainer.appendChild(solutionContent);
        }
    } else {
        alert(result.message);
    }
} 