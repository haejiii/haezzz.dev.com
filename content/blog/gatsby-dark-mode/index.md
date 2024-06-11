---
title: 다크 모드 적용 및 SSR 화면 깜박임 해결 (with Gatsby)
date: '2024-05-28 09:35:37'
description: '이번 글에서는 다크 모드 적용 방법과 Gatsby 에서 화면 깜박임 현상을 해결했던 경험에 대해 설명합니다.'
published: true
tags:
  - react
  - gatsby
  - css
  - theme
---

## 들어가기에 앞서

Gatsby 를 이용해 블로그 만들기를 시작하면서, 다크 모드 적용과 UI를 빠르게 구현하기 위해서 TailwindCSS, Material UI 등 UI 라이브러리 도입을 고민했습니다. 하지만 구현해야할 페이지와 컴포넌트가 다소 적기 때문에 배보다 배꼽이 더 크다 생각되어, SCSS와 모듈 방식을 선택했습니다.

이번 포스팅에선 Gatsby 블로그 구축 과정 중 CSS를 이용해 다크 모드를 적용한 경험과 마주친 문제를 해결해나간 과정을 공유해보려고합니다.

<br/>

## 모드별 테마 컬러 적용

다크 모드를 구현하기 위해선 기본 컬러(`light`)와 다크 모드시 사용할 다크 컬러(`dark`)를 정의 해줘야 합니다.

**`:root` 가상 클래스, 전역 변수 선언**

모드 적용에 앞서 `:root` 가상 클래스와 전역 변수 선언에 대해 알아보겠습니다.
`:root` 선택자는 웹 문서 구조에서 가장 상위 요소를 선택할 때 사용합니다. `:root를 이용해 최상위 요소에 변수를 선언하면 모든 요소에서 이 변수를 사용할 수 있습니다.
아래와 같이 `:root` 가상 클래스로 전역으로 사용할 변수 정의 부분을 감싸줍니다.

```css
:root {
  --bg1: #1b1b1e;
  --bg2: #f8f9fc;
  --textColor: #f8f9fc;
  --borderColor: #f8f9fc;
}
```

<br />
이제 `:root` 가상 클래스의 CSS 변수를 이용한 테마 모드를 적용해보겠습니다.
먼저 아래의 두 가지 방법으로 다크 모드를 적용할 수 있습니다. 각 방법에 대해 장점과 단점을 작성해봤습니다.

1. 시스템 테마 `prefers-color-schema` 미디어 쿼리 사용

- 장점 : CSS 만으로 테마를 구현할 수 있다.
- 단점 : light, dark 테마 모드만 적용 가능하고, 사용자의 시스템 설정을 무조건 따라야한다.

2. body 태그에 테마에 따라 class 추가

- 장점 : light, dark 이외의 다른 테마 모드도 적용 가능하고, 테마 변경이 자유롭다.
- 단점 : CSS 만으로 제어할 수 없고, 제어를 위한 추가 스크립트를 구현해야한다.

<br/>

### 1. 미디어 쿼리를 이용한 다크 모드 적용

`prefers-color-scheme` 는 미디어 쿼리로 CSS에서 제공하는 기능 중 하나입니다. `prefers-color-scheme` 를 통해 CSS는 현재 시스템의 컬러 모드를 확인하여 코드를 실행합니다.

<details>
    <summary>JS 에서 시스템 컬러 모드 확인하는 방법</summary>

```js
// prefers-color-scheme 미디어 쿼리 값이 `dark` 인 지 매칭
window.matchMedia('(prefers-color-scheme: dark)').matches
```

</details>

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg1: #1b1b1e;
    --bg2: #f8f9fc;
    --textColor: #f8f9fc;
    --borderColor: #f8f9fc;
  }
}
```

<br/>

마지막으로 `prefers-color-scheme` 를 사용할 때 주의해야될 점이 있습니다.

- `prefers-color-scheme` 미디어 쿼리는 몇몇 구 버전에서는 지원되지 않습니다.
- 항상 시스템의 결정에 따라 컬러모드를 결정해야 하는 한계가 있습니다.

이러한 주의사항을 파악하고, 문제가 없다면 미디어 쿼리를 사용하여 간단히 다크 모드를 적용하실 수 있습니다.

<br/>

### 2. body 태그에 컬러모드 값 부여하기

body 태그에 `dark` class 를 추가하여 다크 모드를 적용하는 방법입니다. 일반적으론 CSS 를 두 번 작성해야되지만, 아래와 같이 `CSS 변수` 를 통해 번거로움을 최소화하실 수 있습니다. 1. 전역으로 사용할 CSS 변수를 정의합니다. 2. 정의한 CSS 변수를 이용해 CSS를 작성합니다. (e.g. `background: var(--bg1);`) 3. 이제 사용자가 다크모드 선택 시 body 태그에 dark 클래스가 추가되어 자동으로 색상 토큰이 적용됩니다.

```css
// 기본 모드 시 적용될 토큰 (LIGHT)
body {
  --bg1: #1b1b1e;
  --bg2: #f8f9fc;
  --textColor: #f8f9fc;
  --borderColor: #f8f9fc;
}

// 다크 모드 시 적용될 토큰 (DARK)
body.dark {
  --bg1: #1b1b1e;
  --bg2: #f8f9fc;
  --textColor: #f8f9fc;
  --borderColor: #f8f9fc;
}
```

<br/>

## 테마 모드 제어

시스템 환경 모드에만 의존하지 않고, 사용자가 직접 변경한 모드를 지속하기 위해선 어떻게 해야할까요?

아래는 **시스템 모드와 로컬 스토리지를 활용**하여 테마 모드를 가져오고, 변경하는 함수입니다.

```js
// 현재 테마 모드 가져오기
const getThemeMode = () => {
  // STEP 1. 로컬 스토리지 값 조회
  const localMode = localStorage.getItem('theme-mode')

  // STEP 2. 시스템 모드 값 조회
  const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const systemMode = isSystemDarkMode ? 'dark' : 'light'

  // STEP 3. 우선적으로 사용자가 설정한 로컬 스토리지 값을 가져온다.
  return localMode ?? systemMode // 로컬 스토리지 값이 없다면 시스템 모드 적용
}

// 테마 모드 변경하기
const setThemeMode = mode => {
  // STEP 1. 사용자가 설정한 모드를 로컬 스토리지에 저장
  localStorage.setItem(mode)

  // STEP 2. 설정한 모드로 body 태그에 class 추가/삭제한다.
  if (mode === 'light') {
    window.document.body.classList.add('dark')
  } else {
    window.document.body.classList.remove('dark')
  }
}
```

<br/>

그리고 페이지에 첫 접근했을때 테마를 적용하기 위해서 useEffect hook 을 사용했습니다.

**페이지 첫 접근 시 적용된 테마 설정**

```js
// 첫 렌더 시에만 실행되도록
useEffect(() => {
  // STEP 1. 현재 테마 모드 가져오기
  const currentMode = getThemeMode()

  // STEP 2. body 태그에 class 추가
  window.document.body.classList.add(currentMode)

  // STEP 3. 로컬 스토리지에 테마 모드 값 갱신
  localStorage.setItem('theme-mode', currentMode)
}, [])
```

<br/>

이렇게하여 사용자의 시스템 모드와 로컬 스토리지를 통해 다크 모드를 적용할 수 있습니다.

마지막으론 서버 사이드 환경(SSR)에서 다크 모드 적용 시 발생하는 화면 깜박임 해결 방법입니다.

SSR은 간단히 말하자면 html 을 서버에서 생성하는 방식입니다. 그렇기 때문에 브라우저에서만 사용 가능한 localStorage 함수를 사용 시 오류가 발생합니다.

이를 위해 `window ≠= ‘undefined’` 로 예외 처리를 해줍니다. 하지만 다음 문제가 발생합니다.

만약 사용자가 다크 모드인 경우 현재 스크립트의 기본 모드값은 light 이기 때문에 화면이 하이드레이팅되는 잠깐의 시점에 흰색 배경 → 검정 배경으로 변경됩니다. 이것을 **화면 깜박임(screen flickering) 현상**이라고 합니다.

화면 깜박임 현상을 해결하기 위해선 화면이 렌더링 되기 전 테마 관련된 스크립트를 먼저 실행함으로써 해결할 수 있습니다.

<br/>

화면의 첫 진입점인 `index.html` 내에 스크립트를 추가하여 초기 모드 값을 가져오거나, gatsby 를 사용할 시 gatsby.ssr.js 파일에서 body 돔이 페인팅되기 전에 스크립트를 실행하도록 추가해줘야합니다.

**index.html**

```html{7-15}
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <script>
      const localThemeMode = localStorage.getItem('${THEME_KEY}')
      const systemThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      const currentMode = localThemeMode ?? systemThemeMode
      document.body.classList.add(currentMode)
    </script>
    <div id="root"></div>
  </body>
</html>
```

<br/>

gatsby.ssr.js

```js
/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  const preloadScript = `
    const localThemeMode = localStorage.getItem('${THEME_KEY}')
    const systemThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    const currentMode = localThemeMode ?? systemThemeMode
    document.body.classList.add(currentMode)
  `
  setHtmlAttributes({ lang: `en` })
  setPreBodyComponents(<script dangerouslySetInnerHTML={{ __html: preloadScript }} />)
}
```

<br/>

마지막으로 페이지 첫 렌더링 시 초기값을 적용하기 위해 useEffect hook 을 수정합니다.

body 에 추가된 테마 클래스를 가져와 SSR과 CSR 테마 상태값을 연동합니다.

```js
useEffect(() => {
	// STEP 1. 현재 테마 모드 가져오기
	const currentMode = getThemeMode()

	// STEP 2. body 태그에 class 추가
	window.document.body.classList.add(currentMode)

	// STEP 3. 로컬 스토리지에 테마 모드 값 갱신
	localStorage.setItem('theme-mode', currentMode)

useEffect(() => {
    // NOTE: 브라우저 환경에서만 실행
    if (isBrowser) {
      const currentMode = window.document.body.classList.contains(THEME_MODE.DARK)
        ? THEME_MODE.DARK
        : THEME_MODE.LIGHT
      setTheme({ ...theme, mode: currentMode })
    }
  }, [])
```

<br/>

## 마치며

CSS를 이용해 다크 모드를 적용하는 방법에 대해 정리해보았습니다. 기존에 이미 익숙해진 UI 라이브러리가 있다면 더욱 빠르게 다크 모드를 적용할 수 있습니다. 하지만 성능을 고려해야되는 실무에서는 UI 라이브러리 도입이 많이 고민될 것이라고 생각합니다. “바퀴를 다시 발명하지 마라”라는 말과 같이 미리 만들어진 바퀴는 개발 시간의 단축시킬 수 있습니다. 하지만 우리는 바퀴를 발명해야되는 순간도 발생합니다. 이때 우리는 다시 순수 CSS 와 JavaScript 를 이용해 개발할 수 있다는 알고있어야합니다.

<br/>
<br/>

## 참고

- [웹에서 다크모드 지원하기 | 카카오엔터테인먼트 FE 기술블로그](https://fe-developers.kakaoent.com/2021/211118-dark-mode)
- [Gatsby 블로그 다크 테마 적용하기](https://godsenal.com/posts/gatsby-블로그-다크-테마-적용하기/)
