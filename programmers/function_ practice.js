// =================================================================
// 1. 자바스크립트 함수는 '일급 객체(First-Class Object)'이다.
// =================================================================
console.log("--- 1. 일급 객체로서의 함수 ---");

// 1-1. 함수는 할당문의 대상이 될 수 있다 (변수에 할당 가능).
// '익명 함수'를 변수 'sayHello'에 할당합니다.
const sayHello = function () {
  console.log("Hello, First-Class Object!");
};
sayHello(); // 변수를 통해 함수를 호출합니다.

// 1-2. 함수는 동일 비교의 대상이 될 수 있다.
const anotherFunc = sayHello;
console.log(
  `[비교] 두 변수는 같은 함수를 가리키는가? ${sayHello === anotherFunc}`
); // true

// 1-3. 함수는 다른 함수의 실제 매개변수(argument)가 될 수 있다. (feat. 콜백 함수)
// 'operate' 함수는 숫자 두 개와 또 다른 '함수'를 매개변수로 받습니다.
function operate(a, b, callbackFunc) {
  console.log(`[콜백 실행] ${a}와 ${b}로 연산을 시작합니다.`);
  // 매개변수로 받은 함수(callbackFunc)를 여기서 호출(call back)합니다.
  const result = callbackFunc(a, b);
  console.log(`[콜백 실행] 연산 결과: ${result}`);
}

// 다양한 함수 생성 방법 (기명, 익명, 화살표)을 활용하여 콜백으로 전달
function add(a, b) {
  return a + b;
} // 기명 함수
const subtract = function (a, b) {
  return a - b;
}; // 익명 함수
const multiply = (a, b) => a * b; // 화살표 함수

operate(10, 5, add);
operate(10, 5, subtract);
operate(10, 5, multiply);

// 1-4. 함수는 다른 함수의 반환 값이 될 수 있다. (feat. 클로저)
// 'createGreeter' 함수는 실행 결과로 또 다른 '함수'를 반환합니다.
function createGreeter(greeting) {
  const fullGreeting = `${greeting}, `;

  // 아래에 반환되는 함수가 바로 '클로저'입니다.
  // 이 함수는 자신이 생성될 때의 환경(createGreeter 함수의 스코프, 변수 greeting)을 기억합니다.
  return function (name) {
    console.log(fullGreeting + name);
  };
}

const greetInKorean = createGreeter("안녕하세요");
const greetInEnglish = createGreeter("Hello");

// 반환된 함수를 실행하면, 생성될 때의 환경을 기억하여 동작합니다.
greetInKorean("주형"); // "안녕하세요, 주형"
greetInEnglish("John"); // "Hello, John"

console.log("\n");

// =================================================================
// 2. 다양한 함수 사용 패턴
// =================================================================
console.log("--- 2. 다양한 함수 사용 패턴 ---");

// 2-1. 즉시 실행 함수 (IIFE, Immediately Invoked Function Expression)
// 함수를 정의함과 동시에 즉시 실행하여, 전역 스코프의 오염을 막고 변수를 캡슐화합니다.
(function () {
  const secretMessage = "이 메시지는 외부에서 접근할 수 없습니다.";
  console.log("[IIFE] 즉시 실행 함수가 호출되었습니다.");
  console.log(`[IIFE] ${secretMessage}`);
})();
// console.log(secretMessage); // Uncaught ReferenceError: secretMessage is not defined

// 2-2. 재귀 함수 (Recursive Function)
// 함수가 자기 자신을 호출하여 반복적인 작업을 수행합니다. (종료 조건이 필수)
function factorial(n) {
  // 종료 조건: n이 1 이하면 1을 반환하고 재귀를 멈춥니다.
  if (n <= 1) {
    return 1;
  }
  // 재귀 호출: n과 n-1의 팩토리얼 결과를 곱합니다.
  return n * factorial(n - 1);
}
console.log(`[재귀 함수] 5! = ${factorial(5)}`); // 120

// 2-3. 중첩 함수 (Nested Function)와 클로저(Closure)
// 위 1-4 예제(createGreeter)가 중첩 함수와 클로저의 좋은 예시입니다.
// 외부 함수(createGreeter) 내부에 내부 함수(익명 함수)가 중첩되어 있고,
// 내부 함수가 외부 함수의 환경을 기억하여 독립적으로 실행되는 것이 클로저입니다.
console.log("[중첩 함수와 클로저] 위 'createGreeter' 예제를 참고하세요.");

// 2-4. 콜백 함수 (Callback Function)
// 특정 작업이 끝난 후 실행되도록 다른 함수의 인자로 전달되는 함수입니다.
// 위 1-3 예제(operate)와 아래의 비동기 예제에서 확인 가능합니다.
function simulateAsyncTask(callback) {
  console.log(
    "[콜백 함수] 비동기 작업을 시작합니다... (예: 서버에서 데이터 가져오기)"
  );
  // setTimeout을 사용하여 2초 후에 작업이 완료되는 상황을 흉내냅니다.
  setTimeout(() => {
    const data = { id: 1, name: "John Doe" };
    console.log("[콜백 함수] 작업이 완료되었습니다!");
    // 작업 완료 후, 인자로 받은 콜백 함수를 호출하여 결과를 전달합니다.
    callback(data);
  }, 2000);
}

// 비동기 작업이 끝난 후 실행될 콜백 함수를 정의합니다.
const handleData = (data) => {
  console.log(`[콜백 함수] 받은 데이터: ${JSON.stringify(data)}`);
};

// 비동기 함수를 호출하면서, 작업이 끝나면 실행될 'handleData' 함수를 전달합니다.
simulateAsyncTask(handleData);
