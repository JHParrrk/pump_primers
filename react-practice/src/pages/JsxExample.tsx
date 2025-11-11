import React from "react";

// JSXExample 컴포넌트
const JSXExample = () => {
  const isVisible = true;
  const userRole = "admin";
  const value = 0;

  return (
    <>
      {/* 큰 div로 래핑 */}
      <div>
        <h1>JSX Example Page</h1>

        {/* 삼항 연산자를 사용한 조건부 렌더링 */}
        <p>{isVisible ? "This is visible!" : "This is hidden!"}</p>

        {/* return || 예시 */}
        <div>{value || "기본값이 표시됩니다."}</div>

        {/* return && 예시 */}
        <div>{isVisible && "이 텍스트는 isVisible이 참일 때만 표시됩니다."}</div>

        {/* 조건문을 통한 렌더링 */}
        {userRole === "admin" ? (
          <p>관리자 모드입니다.</p>
        ) : (
          <p>일반 사용자 모드입니다.</p>
        )}

        {/* 부모 요소로 빈 태그도 사용 가능 */}
        <>
          <p>빈 태그도 JSX에서 사용할 수 있습니다.</p>
        </>
      </div>
    </>
  );
};

export default JSXExample;