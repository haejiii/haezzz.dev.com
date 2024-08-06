---
title: '[Book Review] 타입으로 견고하게 다형성으로 유연하게'
date: '2024-08-02 23:35:37'
description: '"타입으로 견고하게 다형성으로 유연하게" 책 리뷰.'
published: true
tags:
  - book
  - type
---

<br />

지인을 통해 알게된 책으로 `타입 검사기가 각 언어별로 어떻게 동작`되고, `각 소개된 기능을 어떤식으로 활용할 수 있는 지`에 대해 작성된 책입니다.

챕터의 첫 시작으로 큐리 박사와 고양이 처르지의 대화가 나오는데, 이번 챕터에서는 어떤 기능을 소개할 지에 대해 미리 유추해 볼 수 있었습니다.

<br />

![book](./images/bookCover.png)

<br />
<br />

## 1장 요약

`1장 타입 검사 흝어보기`에서는 `타입 검사가 왜 필요한 지` 그리고 `타입 검사기`와 `정적, 동작 타입 언어` 등 타입의 기본적인 개념을 설명하며 마지막으로 `다형성`에 대해 설명합니다.

<br />

> Q. 왜 불편함을 감수하면서까지 타입 검사를 해야되나요?

> A. 잠재적인 버그를 찾기 위해서입니다! 수 많은 버그 중 가장 흔한 원인은 `타입 오류(type error)`입니다. 타입 오류는 프로그램이 예기치 않게 종료되버리기 때문에 매우 치명적입니다.

<br />

> Q. 타입 검사기는 무엇이고, 어떤 원리로 동작되나요?

> A. 타입 검사기(type checker)는 작성된 프로그램이 타입 오류를 일으키는 지 자동으로 판단해주는 검사기입니다. 타입은 작은 부품들이 결합한 하나의 큰 타입이고, 작은 타입의 정보를 읽고, 얻은 정보를 통해 큰 타입을 구성할 때 각각의 작은 타입들이 올바르게 사용되었는 지를 확인하는 것을 반복합니다.

### 💡 타입 검사의 원칙 "타입 검사기는 계산 결과를 절대 알아내려 하지 않는다."

<br />

### 타입 검사의 장점

- 타입 오류를 빠트리지 않고 모두 찾을 수 있다.
- 오류 메시지를 통해 올바르게 고치기 쉽다
- 코드 편집기에서 다양한 기능을 제공하고, 대표적인 기능으론 자동 완성 기능과 이름 바꾸기 기능이 있다.
- 뛰어난 성능, 타입 검사에서 얻은 정보를 바탕으로 실행 중에 할 일을 줄일 수 있다.
  - 실행 중에 불필요한 검사(매번 인자가 정수인지 확인) 시간을 줄여준다.

<br/>

> Q. 타입 추론과 타입 표시는 어떻게 사용하는게 좋을까요?

> A. 타입 검사기가 잘못된 추론을 하거나, 추론할 수 없는 경우 또는 코드의 정보를 명확히 표시해야될 때 타입 표시를 해줄 수 있습니다.

```typescript
// ❌ file 이 File 타입인지 File Path인 string 타입인 지 정확히 알 수 없다.
function readFile(file) { ... }

// 🅾️ readFile 의 인자로 File 타입을 넘기면 된다는 것을 명확히 알 수 있다.
function readFile(file: File) { ... }
```

<br/>

### 다형성

다형성은 타입 검사기 동작 원리의 가장 중요한 개념입니다. 다형성은 `하나의 타입에 여러 객체를 대입할 수 있는 성질`로 `하나의 값이 여러 타입`에 속할 수 있고, `하나의 함수를 여러 타입의 합수로` 사용할 수 도 있다는 것입니다.

<br />

다형성은 어떤 개체에 어떻게 부여하는지에 따라 나눌 수 있습니다.

- `서브타입`에 의한 다형성
- `매개변수`에 의한 다형성
- `오버로딩`에 의한 다형성

<br />

---

## 2장 요약

### 서브타입에 의한 다형성 규칙

- 요구 조건 : `A가 B이다.`
- A가 B이면 `A는 B의 서브타입`이다.
- A가 B의 서브타입이면 `B는 A의 슈퍼타입`이다.

<br />

---

## 3장 요약

<br />

### 제니릭 함수 예시

```ts
// useToast 훅 내의 validation 검사 함수
const useToast = () => {
	...

  const toastOnInvalidForm = <T extends FieldErrors>(err: T) => {
    const firstError = Object.values(err)[0]?.message
    toast(firstError as ReactNode, 'error')
	}

	return { ..., toastOnInvalidForm }
}
```

<br />

### 제네릭 타입 예시

```ts
type Img<T> = T & {
  width: number
  height: number
}

type ContentImg = {
  name: string
  src: string
}

interface Content {
  img: Img<ContentImg>
}

const content: Content = {
  img: {
    width: 0,
    height: 0,
    name: '',
    src: '',
  },
}

console.log(content)
```

<br />

### 타입 챌린지

- 요구 조건 : Omit 제네릭 타입을 사용하지 않고 만들기

```ts
type MyOmit<T extends {}, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>
]
```

- T는 타입 매개변수로 object 를 확장한 타입 매개변수이다.
- object 타입만 인자로 넘길 수 있다. (타입 좁히기)
- K 는 T 타입 매개변수를 확장한 T object에 속한 key 타입으로 확장하여, object key에 해당되는 인자만 넘길 수 있다. (타입 좁히기)
- MyOmit 함수는 object의 타입 매개변수를 받아 object 에 속한 key 중 K 를 제외한 타입이다.

<br />

## 4장 요약

<br />

## 5장 요약

<br />

## 전반적인 책 후기

4장과 5장부터는 동적 언어인 하스켈과 같은 언어에서 사용되는 타입 검사기의 기능이 전반적으로 설명되어 이해하기 쉽지 않았습니다.
