// AI 리플렉션 기능 구현
class AIReflection {
    constructor() {
        this.apiEndpoint = 'https://api.core.ai/v1/reflection';
        this.userId = null;
        this.learningData = [];
        this.insights = null;
        this.studyPatterns = null;
        this.recommendations = null;
        this.weeklyGoal = null;
        this.weeklyProgress = 0;
    }

    // 사용자 초기화
    initUser(userId) {
        this.userId = userId;
        this.loadUserData();
        return {
            success: true,
            message: '사용자가 초기화되었습니다.'
        };
    }

    // 사용자 학습 데이터 로드
    loadUserData() {
        // 실제 구현에서는 API 호출
        // 여기서는 데모 데이터 사용
        
        const today = new Date();
        
        // 최근 30일간의 학습 데이터 생성
        this.learningData = [];
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            
            // 학습 시간 생성 (0~5시간)
            // 주말(토,일)에는 학습 시간이 더 길게 설정
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            let studyHours;
            
            if (isWeekend) {
                studyHours = Math.random() * 3 + 2; // 2~5시간
            } else {
                studyHours = Math.random() * 2 + (i % 3 === 0 ? 0 : 1); // 1~3시간, 가끔 0
            }
            
            // 주제 생성
            const topics = ['프로그래밍', '수학', '영어', '과학', '역사'];
            const randomTopics = [];
            const topicCount = Math.floor(Math.random() * 3) + 1; // 1~3개 주제
            
            for (let j = 0; j < topicCount; j++) {
                const topic = topics[Math.floor(Math.random() * topics.length)];
                if (!randomTopics.includes(topic)) {
                    randomTopics.push(topic);
                }
            }
            
            // 문제 풀이 정확도 (50~100%)
            const accuracyRates = {};
            randomTopics.forEach(topic => {
                accuracyRates[topic] = Math.round(Math.random() * 50 + 50);
            });
            
            // 퀴즈 점수 (0~100점)
            const quizScores = {};
            const hasQuiz = Math.random() > 0.7; // 30%의 확률로 퀴즈 있음
            
            if (hasQuiz) {
                randomTopics.forEach(topic => {
                    quizScores[topic] = Math.round(Math.random() * 40 + 60); // 60~100점
                });
            }
            
            // 학습 집중도 (1~10)
            // 학습 시간이 길수록 집중도가 떨어지는 경향 반영
            let concentration = Math.round(Math.random() * 3 + (studyHours > 3 ? 4 : 7));
            if (concentration > 10) concentration = 10;
            
            // 학습 데이터 추가
            this.learningData.push({
                date: date.toISOString().split('T')[0],
                studyHours: parseFloat(studyHours.toFixed(1)),
                topics: randomTopics,
                accuracyRates,
                quizScores,
                concentration,
                note: hasQuiz ? '퀴즈 응시' : (Math.random() > 0.7 ? '집중력 저하' : '정상 학습')
            });
        }
        
        // 데이터 분석
        this.analyzeData();
        
        return {
            success: true,
            data: this.learningData,
            message: '사용자 데이터가 로드되었습니다.'
        };
    }

    // 데이터 분석
    analyzeData() {
        if (!this.learningData || this.learningData.length === 0) {
            return {
                success: false,
                message: '분석할 데이터가 없습니다.'
            };
        }
        
        // 주간 목표 설정 (최근 4주 평균 + 10%)
        const recentWeekHours = this.calculateWeeklyStudyHours(4);
        const avgWeekHours = recentWeekHours.reduce((sum, hours) => sum + hours, 0) / recentWeekHours.length;
        this.weeklyGoal = parseFloat((avgWeekHours * 1.1).toFixed(1));
        
        // 이번 주 진행 상황
        const thisWeekHours = this.calculateWeeklyStudyHours(1)[0];
        this.weeklyProgress = parseFloat((thisWeekHours / this.weeklyGoal * 100).toFixed(1));
        
        // 학습 패턴 분석
        this.studyPatterns = this.analyzeStudyPatterns();
        
        // 인사이트 생성
        this.insights = this.generateInsights();
        
        // 맞춤형 추천
        this.recommendations = this.generateRecommendations();
        
        return {
            success: true,
            insights: this.insights,
            studyPatterns: this.studyPatterns,
            recommendations: this.recommendations,
            weeklyGoal: this.weeklyGoal,
            weeklyProgress: this.weeklyProgress,
            message: '데이터 분석이 완료되었습니다.'
        };
    }

    // 주간 학습 시간 계산
    calculateWeeklyStudyHours(weekCount = 4) {
        const weeklyHours = [];
        const sortedData = [...this.learningData].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        let currentWeekHours = 0;
        let weekStartDate = new Date(sortedData[0].date);
        weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay()); // 이번 주 일요일로 설정
        
        let currentWeekIndex = 0;
        
        sortedData.forEach(day => {
            const dayDate = new Date(day.date);
            
            // 새로운 주가 시작되면 이전 주 데이터 저장
            if (dayDate < weekStartDate && currentWeekIndex < weekCount) {
                weeklyHours.push(parseFloat(currentWeekHours.toFixed(1)));
                currentWeekHours = 0;
                currentWeekIndex++;
                
                // 다음 주 시작일 계산
                weekStartDate.setDate(weekStartDate.getDate() - 7);
            }
            
            // 현재 주에 속하면 시간 누적
            if (currentWeekIndex < weekCount) {
                currentWeekHours += day.studyHours;
            }
        });
        
        // 마지막 주 데이터 추가
        if (currentWeekHours > 0 && currentWeekIndex < weekCount) {
            weeklyHours.push(parseFloat(currentWeekHours.toFixed(1)));
        }
        
        // 부족한 주 데이터는 0으로 채움
        while (weeklyHours.length < weekCount) {
            weeklyHours.push(0);
        }
        
        return weeklyHours;
    }

    // 학습 패턴 분석
    analyzeStudyPatterns() {
        // 요일별 평균 학습 시간
        const dayOfWeekHours = [0, 0, 0, 0, 0, 0, 0]; // 일,월,화,수,목,금,토
        const dayOfWeekCount = [0, 0, 0, 0, 0, 0, 0];
        
        // 주제별 학습 비율
        const topicDistribution = {};
        
        // 시간대별 학습 집중도
        const timeOfDayConcentration = {
            '오전': { total: 0, count: 0 },
            '오후': { total: 0, count: 0 },
            '저녁': { total: 0, count: 0 }
        };
        
        this.learningData.forEach(day => {
            const dayDate = new Date(day.date);
            const dayOfWeek = dayDate.getDay();
            
            // 요일별 학습 시간 누적
            dayOfWeekHours[dayOfWeek] += day.studyHours;
            dayOfWeekCount[dayOfWeek]++;
            
            // 주제별 분포 계산
            day.topics.forEach(topic => {
                if (!topicDistribution[topic]) {
                    topicDistribution[topic] = 0;
                }
                topicDistribution[topic]++;
            });
            
            // 시간대별 집중도 (실제 데이터에는 없어서 랜덤 생성)
            const timeOfDay = Math.random() > 0.6 ? '오전' : (Math.random() > 0.5 ? '오후' : '저녁');
            timeOfDayConcentration[timeOfDay].total += day.concentration;
            timeOfDayConcentration[timeOfDay].count++;
        });
        
        // 요일별 평균 계산
        const dayOfWeekAvg = dayOfWeekHours.map((hours, index) => 
            dayOfWeekCount[index] > 0 ? parseFloat((hours / dayOfWeekCount[index]).toFixed(1)) : 0
        );
        
        // 주제별 비율 계산
        const totalTopicEntries = Object.values(topicDistribution).reduce((a, b) => a + b, 0);
        const topicPercentages = {};
        
        Object.keys(topicDistribution).forEach(topic => {
            topicPercentages[topic] = parseFloat(((topicDistribution[topic] / totalTopicEntries) * 100).toFixed(1));
        });
        
        // 시간대별 평균 집중도 계산
        const timeOfDayAvg = {};
        Object.keys(timeOfDayConcentration).forEach(time => {
            timeOfDayAvg[time] = timeOfDayConcentration[time].count > 0 
                ? parseFloat((timeOfDayConcentration[time].total / timeOfDayConcentration[time].count).toFixed(1))
                : 0;
        });
        
        return {
            dayOfWeekAvg,
            topicPercentages,
            timeOfDayAvg,
            mostProductiveDay: dayOfWeekAvg.indexOf(Math.max(...dayOfWeekAvg)),
            mostStudiedTopic: Object.keys(topicPercentages).reduce((a, b) => topicPercentages[a] > topicPercentages[b] ? a : b),
            bestTimeOfDay: Object.keys(timeOfDayAvg).reduce((a, b) => timeOfDayAvg[a] > timeOfDayAvg[b] ? a : b)
        };
    }

    // 인사이트 생성
    generateInsights() {
        if (!this.studyPatterns) {
            return null;
        }
        
        const insights = [];
        
        // 학습 시간 인사이트
        const totalStudyHours = this.learningData.reduce((sum, day) => sum + day.studyHours, 0);
        const avgDailyHours = parseFloat((totalStudyHours / this.learningData.length).toFixed(1));
        
        insights.push({
            type: 'studyTime',
            title: '학습 시간 분석',
            description: `지난 30일간 총 ${totalStudyHours.toFixed(1)}시간을 공부했으며, 하루 평균 ${avgDailyHours}시간을 학습했습니다.`
        });
        
        // 요일별 패턴 인사이트
        const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const mostProductiveDayName = dayNames[this.studyPatterns.mostProductiveDay];
        
        insights.push({
            type: 'dayPattern',
            title: '요일별 학습 패턴',
            description: `${mostProductiveDayName}에 학습 시간이 가장 길고 생산적입니다. 주말과 주중의 학습 패턴에 차이가 있습니다.`
        });
        
        // 주제 분포 인사이트
        insights.push({
            type: 'topicDistribution',
            title: '학습 주제 분포',
            description: `${this.studyPatterns.mostStudiedTopic} 주제를 가장 많이 학습했으며, 전체의 약 ${this.studyPatterns.topicPercentages[this.studyPatterns.mostStudiedTopic]}%를 차지합니다.`
        });
        
        // 학습 집중도 인사이트
        const avgConcentration = parseFloat(
            (this.learningData.reduce((sum, day) => sum + day.concentration, 0) / this.learningData.length).toFixed(1)
        );
        
        insights.push({
            type: 'concentration',
            title: '학습 집중도 분석',
            description: `평균 집중도는 10점 만점에 ${avgConcentration}점이며, ${this.studyPatterns.bestTimeOfDay}에 가장 집중력이 높습니다.`
        });
        
        // 퀴즈 및 문제 정확도 인사이트
        const accuracyRates = {};
        let accuracyDataCount = 0;
        
        this.learningData.forEach(day => {
            Object.keys(day.accuracyRates).forEach(topic => {
                if (!accuracyRates[topic]) {
                    accuracyRates[topic] = { total: 0, count: 0 };
                }
                accuracyRates[topic].total += day.accuracyRates[topic];
                accuracyRates[topic].count++;
                accuracyDataCount++;
            });
        });
        
        if (accuracyDataCount > 0) {
            const avgAccuracyRates = {};
            Object.keys(accuracyRates).forEach(topic => {
                avgAccuracyRates[topic] = parseFloat(
                    (accuracyRates[topic].total / accuracyRates[topic].count).toFixed(1)
                );
            });
            
            const lowestAccuracyTopic = Object.keys(avgAccuracyRates).reduce(
                (a, b) => avgAccuracyRates[a] < avgAccuracyRates[b] ? a : b
            );
            
            insights.push({
                type: 'accuracy',
                title: '문제 정확도 분석',
                description: `${lowestAccuracyTopic} 주제에서 정확도가 ${avgAccuracyRates[lowestAccuracyTopic]}%로 가장 낮습니다. 이 부분에 추가 노력이 필요합니다.`
            });
        }
        
        return insights;
    }

    // 맞춤형 추천 생성
    generateRecommendations() {
        if (!this.studyPatterns || !this.insights) {
            return null;
        }
        
        const recommendations = [];
        
        // 학습 시간 최적화 추천
        const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const leastProductiveDay = this.studyPatterns.dayOfWeekAvg.indexOf(
            Math.min(...this.studyPatterns.dayOfWeekAvg.filter(val => val > 0))
        );
        
        if (leastProductiveDay >= 0) {
            recommendations.push({
                type: 'timeOptimization',
                title: '학습 시간 최적화',
                description: `${dayNames[leastProductiveDay]}에 학습 시간이 가장 적습니다. 이 날에 추가 학습 시간을 확보하면 주간 학습 균형이 좋아질 것입니다.`
            });
        }
        
        // 집중력 향상 추천
        const lowestConcentrationTime = Object.keys(this.studyPatterns.timeOfDayAvg).reduce(
            (a, b) => this.studyPatterns.timeOfDayAvg[a] < this.studyPatterns.timeOfDayAvg[b] ? a : b
        );
        
        recommendations.push({
            type: 'concentrationImprovement',
            title: '집중력 향상 전략',
            description: `${lowestConcentrationTime}에 집중력이 가장 떨어집니다. 이 시간대에는 짧은 학습 세션과 충분한 휴식을 병행하는 것이 효과적입니다.`
        });
        
        // 주제 균형 추천
        const topicKeys = Object.keys(this.studyPatterns.topicPercentages);
        if (topicKeys.length > 1) {
            const minStudiedTopic = topicKeys.reduce(
                (a, b) => this.studyPatterns.topicPercentages[a] < this.studyPatterns.topicPercentages[b] ? a : b
            );
            
            if (this.studyPatterns.topicPercentages[minStudiedTopic] < 15) {
                recommendations.push({
                    type: 'topicBalance',
                    title: '주제 균형 조정',
                    description: `${minStudiedTopic} 주제에 더 많은 시간을 투자하는 것이 좋습니다. 현재 전체 학습의 ${this.studyPatterns.topicPercentages[minStudiedTopic]}%만 차지하고 있습니다.`
                });
            }
        }
        
        // 정확도 향상 추천
        const accuracyRates = {};
        
        this.learningData.forEach(day => {
            Object.keys(day.accuracyRates).forEach(topic => {
                if (!accuracyRates[topic]) {
                    accuracyRates[topic] = { total: 0, count: 0 };
                }
                accuracyRates[topic].total += day.accuracyRates[topic];
                accuracyRates[topic].count++;
            });
        });
        
        const avgAccuracyRates = {};
        Object.keys(accuracyRates).forEach(topic => {
            avgAccuracyRates[topic] = parseFloat(
                (accuracyRates[topic].total / accuracyRates[topic].count).toFixed(1)
            );
        });
        
        if (Object.keys(avgAccuracyRates).length > 0) {
            const lowestAccuracyTopic = Object.keys(avgAccuracyRates).reduce(
                (a, b) => avgAccuracyRates[a] < avgAccuracyRates[b] ? a : b
            );
            
            recommendations.push({
                type: 'accuracyImprovement',
                title: '정확도 향상 전략',
                description: `${lowestAccuracyTopic} 주제의 정확도 향상을 위해 기본 개념 복습과 문제 유형별 접근법을 다시 점검하세요.`
            });
        }
        
        // 추가 학습 목표 추천
        const weeklyHours = this.calculateWeeklyStudyHours(4);
        const targetWeeklyHours = parseFloat((Math.max(...weeklyHours) * 1.1).toFixed(1));
        
        recommendations.push({
            type: 'weeklyGoal',
            title: '주간 학습 목표',
            description: `최적의 성장을 위해 주당 ${targetWeeklyHours}시간 학습을 목표로 설정하는 것이 좋습니다.`
        });
        
        return recommendations;
    }

    // 주간 목표 설정
    setWeeklyGoal(hours) {
        this.weeklyGoal = parseFloat(hours.toFixed(1));
        
        return {
            success: true,
            weeklyGoal: this.weeklyGoal,
            message: '주간 목표가 설정되었습니다.'
        };
    }

    // 새 학습 기록 추가
    addLearningRecord(record) {
        if (!record.date || !record.studyHours || !record.topics || record.topics.length === 0) {
            return {
                success: false,
                message: '필수 학습 데이터가 누락되었습니다.'
            };
        }
        
        // 동일 날짜의 기존 기록 확인
        const existingIndex = this.learningData.findIndex(item => item.date === record.date);
        
        if (existingIndex >= 0) {
            // 기존 기록 업데이트
            this.learningData[existingIndex] = {
                ...this.learningData[existingIndex],
                ...record
            };
        } else {
            // 새 기록 추가
            this.learningData.push(record);
        }
        
        // 데이터 재분석
        this.analyzeData();
        
        return {
            success: true,
            data: this.learningData,
            message: '학습 기록이 추가되었습니다.'
        };
    }
}

// 페이지 로드 시 AI 리플렉션 객체 생성 및 UI 이벤트 연결
document.addEventListener('DOMContentLoaded', () => {
    // 전역 인스턴스 생성
    window.aiReflection = new AIReflection();
    
    // 데모 사용자 ID로 초기화
    window.aiReflection.initUser('demo_user_' + Date.now());
    
    // 차트 렌더링 관련 UI 초기화
    initUI();
});

// UI 초기화 함수
function initUI() {
    // 필요한 UI 요소들
    const weeklyGoalDisplay = document.getElementById('weekly-goal');
    const weeklyProgressBar = document.getElementById('weekly-progress');
    const insightsContainer = document.getElementById('insights-container');
    const recommendationsContainer = document.getElementById('recommendations-container');
    
    // 주간 목표 및 진행 상황 표시
    if (weeklyGoalDisplay && window.aiReflection.weeklyGoal) {
        weeklyGoalDisplay.textContent = `${window.aiReflection.weeklyGoal}시간`;
    }
    
    if (weeklyProgressBar && window.aiReflection.weeklyProgress) {
        weeklyProgressBar.style.width = `${window.aiReflection.weeklyProgress}%`;
        weeklyProgressBar.setAttribute('aria-valuenow', window.aiReflection.weeklyProgress);
        
        const progressLabel = document.getElementById('weekly-progress-label');
        if (progressLabel) {
            progressLabel.textContent = `${window.aiReflection.weeklyProgress}%`;
        }
    }
    
    // 인사이트 렌더링
    if (insightsContainer && window.aiReflection.insights) {
        insightsContainer.innerHTML = '';
        
        window.aiReflection.insights.forEach(insight => {
            const insightCard = document.createElement('div');
            insightCard.className = 'insight-card';
            insightCard.innerHTML = `
                <h3><i class="fas fa-lightbulb"></i> ${insight.title}</h3>
                <p>${insight.description}</p>
            `;
            insightsContainer.appendChild(insightCard);
        });
    }
    
    // 추천 사항 렌더링
    if (recommendationsContainer && window.aiReflection.recommendations) {
        recommendationsContainer.innerHTML = '';
        
        window.aiReflection.recommendations.forEach(recommendation => {
            const recommendationCard = document.createElement('div');
            recommendationCard.className = 'recommendation-card';
            recommendationCard.innerHTML = `
                <h3><i class="fas fa-check-circle"></i> ${recommendation.title}</h3>
                <p>${recommendation.description}</p>
            `;
            recommendationsContainer.appendChild(recommendationCard);
        });
    }
    
    // 학습 패턴 차트 렌더링 (Chart.js 사용 가정)
    renderStudyPatternCharts();
}

// 학습 패턴 차트 렌더링 함수
function renderStudyPatternCharts() {
    if (!window.aiReflection.studyPatterns) {
        return;
    }
    
    // 학습 차트를 렌더링하는 코드
    // 실제 구현에서는 Chart.js 등의 라이브러리 사용
    
    // 요일별 학습 시간 차트
    const dayOfWeekChart = document.getElementById('day-of-week-chart');
    if (dayOfWeekChart && typeof Chart !== 'undefined') {
        const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
        
        new Chart(dayOfWeekChart, {
            type: 'bar',
            data: {
                labels: dayLabels,
                datasets: [{
                    label: '요일별 평균 학습 시간',
                    data: window.aiReflection.studyPatterns.dayOfWeekAvg,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '시간'
                        }
                    }
                }
            }
        });
    }
    
    // 주제별 학습 비율 차트
    const topicDistributionChart = document.getElementById('topic-distribution-chart');
    if (topicDistributionChart && typeof Chart !== 'undefined') {
        const topicData = window.aiReflection.studyPatterns.topicPercentages;
        
        new Chart(topicDistributionChart, {
            type: 'pie',
            data: {
                labels: Object.keys(topicData),
                datasets: [{
                    data: Object.values(topicData),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // 주간 학습 시간 추세 차트
    const weeklyTrendChart = document.getElementById('weekly-trend-chart');
    if (weeklyTrendChart && typeof Chart !== 'undefined') {
        const weeklyData = window.aiReflection.calculateWeeklyStudyHours(4);
        const weekLabels = ['이번 주', '1주 전', '2주 전', '3주 전'];
        
        new Chart(weeklyTrendChart, {
            type: 'line',
            data: {
                labels: weekLabels,
                datasets: [{
                    label: '주간 학습 시간',
                    data: weeklyData.reverse(), // 오래된 데이터부터 표시
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '시간'
                        }
                    }
                }
            }
        });
    }
} 