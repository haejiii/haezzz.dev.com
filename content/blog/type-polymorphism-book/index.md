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

지인을 통해 알게된 책으로 타입을 제대로 알기위해선 타입 검사기의 동작 원리를 알야한다는 것을 일깨워준 책입니다.

뒤로 갈수록 앞에서나온 개념이 심화되어 설명되고, 함수형 언어에서의 타입검사기의 확장된 기능까지 소개되어 매우 흥미로웠던 책이었던 것 같습니다.

<br />

![book](./images/bookCover.png)

<br />
<br />

## 첫 단원 요약

`1장 타입 검사 흝어보기`에서는 `타입 검사가 왜 필요한 지` 그리고 `타입 검사기`와 `정적, 동작 타입 언어` 등 타입의 기본적인 개념을 설명하며 마지막으로 앞으로 나올 `다형성`에 대해 설명합니다.

<br />

> Q. 왜 불편함을 감수하면서까지 타입 검사를 해야되나요?

> A. `잠재적인 버그`를 찾기 위해서입니다. 수 많은 버그 중 가장 흔한 원인은 `타입 오류(type error)`입니다. 타입 오류는 프로그램이 예기치 않게 종료되버리기 때문에 매우 치명적입니다.

<br />

> Q. 타입 검사기는 무엇이고, 어떤 원리로 동작되나요?

> A. 타입 검사기(type checker)는 작성된 프로그램이 `타입 오류를 일으키는 지 자동으로 판단해주는 검사기`입니다. 타입은 `작은 부품들이 결합한 하나의 큰 타입`이고, 작은 타입의 정보를 읽고, 얻은 정보를 통해 큰 타입을 구성할 때 각각의 작은 타입들이 올바르게 사용되었는 지를 확인하는 것을 반복합니다.

**💡 타입 검사의 원칙 "타입 검사기는 계산 결과를 절대 알아내려 하지 않는다."**

<br />
<br />

### 타입 검사의 장점

- 타입 오류를 빠트리지 않고 모두 찾을 수 있다.
- 오류 메시지를 통해 올바르게 고치기 쉽다
- 코드 편집기에서 다양한 기능을 제공하고, 대표적인 기능으론 자동 완성 기능과 이름 바꾸기 기능이 있다.
- 뛰어난 성능, 타입 검사에서 얻은 정보를 바탕으로 실행 중에 할 일을 줄일 수 있다.
  - 실행 중에 불필요한 검사(매번 인자가 정수인지 확인) 시간을 줄여준다.

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

## 다형성 규칙 한 번에 보기

<br />

### 서브타입에 의한 다형성 규칙

> 요구 조건 : `A가 B이다.`

- A가 B이면 `A는 B의 서브타입`이다.
- A가 B의 서브타입이면 `B는 A의 슈퍼타입`이다.

```ts
interface Person { ... }

// 이 때 Student 는 Person 의 서브타입입니다.
// Student(학생)는(은) Person(사람)이기 떄문입니다.
interface Student extends Person { ... }
```

> 💡 반대로 Person은 Student 일 수 없습니다. 그러므로 Person 은 Student의 슈퍼타입!

<br />

### `이름`과 `구조`에 의해 결정되는 서브타입

**이름에 의한 서브타입(nominal subtyping)**

타입 검사기가 `interface` (or `class`) 이름과 타입 간의 extends된 관계만 고려합니다.
A가 B를 extends(확장/상속)한다면 A는 B의 서브타입입니다.

다음과 같이 Student 는 extends 를 통해 Person 으로 확장합니다.
class 에서는 상속을 말하고, 아래와 같이 명시적으로 확장/상속한 것을 `직접확장/상속` 이라 합니다.

```ts
  interface Person { ... }
  interface Student extends Person { ... }
```

Student는 간접적으로 School을 확장/상속하고 있습니다. 이를 `간접확장/상속` 이라 합니다.
Student는 Person 과 School 의 서브타입입니다.

```ts
  interface School { ... }
  interface Person extends School { ... }
  interface Student extends Person { ... }
```

<br />

**구조에 의한 서브타입(structure subtyping)**

구조적으로 정의된 필드와 메서드가 동일하게 정의되어있다면 A는 B의 서브타입입니다.

다음의 Student는 Person 의 필드가 동일하게 정의되어있습니다.
그러므로 Student는 Person의 서브타입입니다. 반대로 Person은 Student의 no 필드가 없으므로 슈터파입이 됩니다.

```ts
interface Person {
  name: string
}

interface Student {
  no: number
  name: string
}
```

<br />

### 매개변수에 의한 다형성 규칙

<br />

### 오버로딩에 의한 다형성 규칙

<br />
<br />

---

## 타입 챌린지

책을 읽고, [타입 챌린지](https://github.com/type-challenges/type-challenges)를 통해 타입 검사기의 원리를 생각하면 타입을 작성해볼 수 있었습니다.

> 요구 조건 : Omit 제네릭 타입을 사용하지 않고 만들기

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

- T는 타입 매개변수로 object 를 확장한 타입 매개변수입니다.
- 타입 좁히기를 통해 객체 리터럴 타입만 인자로 넘길 수 있습니다.
- K는 T의 타입 매개변수를 확장한 T 객체 리터럴에 속한 key 타입으로 확장합니다. 그러기때문에 객체 리터럴의 key에 해당되는 인자만 넘길 수 있습니다.
- MyOmit 함수는 객체 리터럴의 타입 매개변수를 받아 객체 리터럴에 속한 key 중 K를 제외한 타입이다.

<br />
<br />

## 마치며

타입 검사기가 다형성을 원리로 동작되는 것은 알고 있었지만, 책에서 소개되고 있는 규칙들에 대해선 자세히 알지 못했습니다. 이번 기회에 알게되어 타입 작성 시 타입 오류가 발생했을때 왜 타입 오류가 발생하는지를 어느정도 유추해볼 수 있게되었습니다.

이 포스팅에서 책의 모든 내용을 담지 못했지만, 4장부터는 소개되는 동적 언어인 하스켈에서 타임 검사기의 다양한 기능이 소개됩니다. 하스켈을 사용해보지 않았기 때문에 이러한 확장된 기능이 제공되었을때 어떤식으로 사용해볼 수 있을지 무척 궁금하네요. 그리하여 다음 챕터로는 `프로그래밍 언어론` 이란 하스켈로 알아보는 의미구조와 타입 시스템이란 책을 읽어보려고합니다.
