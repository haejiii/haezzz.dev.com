---
title: Mixin의 한계와 Composition API 도입
date: '2024-05-14 15:04:55'
description: '이번 글에서는 Vue.js 3에서 공식적으로 Mixins 사용을 지양하는 이유를 설명합니다.'
published: true
tags:
  - vue
  - mixin
---

## 믹스인(Mixin) 란?

믹스인(mixin)은 소프트웨어 개발 원칙 중 `DRY(Do not Repeat Yourself)` 원칙을 지키기 위해 만들어졌습니다.

DRY의 중복배제로 `같은 정보의 중복을 지양하라`는 개념으로 믹스인은 이러한 원칙을 통해 설계되었고, 여러 컴포넌트 간에 공통된 기능을 분리하여 하나의 mixin 으로 컴포넌트간의 기능을 공유할 수 있도록 합니다.

<br>

### Vue.js 3에서 믹스인 사용이 권장되지 않는 이유

이러한 믹스인은 겉으로 봤을땐 코드 재사용성과 확장성에 용이하다는 이점이 있지만, `근본적인 단점`이 존재합니다.

- 네이밍스페이스 `충돌`
- `암시적` mixin간의 충돌
- `불분명한` 출처
- `예측하지` 못한 사이드 이펙트 발생 우려

믹스인은 `암시적`으로 data, method, life cycle hook 를 컴포넌트에 등록합니다. 이로 인해 네임스페이스 충돌이 발생하고, 코드의 추적이 어려워질 수 있습니다.

또한 컴포넌트와 믹스인 사이에 `동일한 라이프 사이클을 가졌을때`, 둘 다 실행되기 때문에 예측하지 못한 이슈가 발생할 수 있습니다.

vue3 공식문서 또한 이러한 문제를 들어 Mixin 을 지양하고, [Composition API 사용을 권장](https://ko.vuejs.org/guide/reusability/composables#comparisons-with-other-techniques)합니다.

<br>

## Composition API의 등장

### Composition API 란?

Composition API는 Vue.js 3에서 도입된 새로운 API입니다.

기존 믹스인의 장점인 `재사용성을 유지`하며, 컴포넌트 로직을 `더 유연한 코드 구조`를 제공합니다.

<br />

### 믹스인과 Composition API 비교해보기

**코드 재사용**

- `믹스인`은 컴포넌트 간에 코드를 공유하는 반면, `Composition API`는 함수를 통해 로직을 공유합니다.

**코드 충돌**

- `믹스인`은 data, method의 이름과 life cycle hook 을 통해 충돌이 발생할 수 있고, `Composition API`는 함수의 스코프를 이용하기 때문에 이러한 문제를 방지합니다.

**코드 구조화**

- `믹스인`은 컴포넌트의 옵션을(data, methods, life cycle hook) 기반으로 코드를 구조화하지만, `Composition API`는 로직(기능)을 기반으로 코드를 구조화합니다.
  이로 인해 비슷한 관심사의 로직의 캡슐화와 응집도를 높일 수 있습니다.

**불분명한 출처(명시성)**

- `믹스인`은 컴포넌트에 암시적으로 기능을 추가하는 반면, `Composition API`는 명시적으로 기능을 추가합니다. 이로 인해 로직이의 가독성이 향상되고, 로직을 쉽게 추적할 수 있습니다.

**러닝 커브**

- `믹스인`은 기존 Vue.js 2에서 제공한 기능이며, 기존의 Vue.js 사용 경험이 있다면 쉽게 익힐 수 있습니다. `Composition API`는 Vue.js 3에서 새로 등장한 개념 및 패턴으로 기존의 옵션 기반 AP에 익숙한 개발자들에게는 생소할 수 있습니다.
  하지만 React.js 를 기본적으로 학습하는 프론트엔드 개발자로써는 오히려 더 쉽게 다가올 수 있는 개념이라고 생각합니다.

<br />

따라서, `Composition API는 믹스인의 이점을 유지하면서도 더욱 명확하고 유연한 코드 구조를 제공`하므로, Vue.js 3에서는 믹스인 대신 Composition API 사용을 권장하고 있습니다.

<br>

## 코드를 통해 Mixin과 Composition API 살펴보기

**e.g. 멤버 정보 조회하는 API**

`Composition API`

```javascript
// useMemberInfo.js
import { ref, onMounted } from 'vue'

export const useMemberInfo = () => {
  const [memberInfo, setMemberInfo] = ref({
    email: '',
    nickName: '',
    phoneNumber: '',
  })

  const getMemberInfo = async () => {
    // 멤버 정보 조회 API 호출
  }

  onMounted(() => {
    getMemberInfo()
  })

  return {
    memberInfo,
    getMemberInfo,
  }
}

// Component.vue
import { useMemberInfo } from './useMemberInfo'

export default {
  setup() {
    // 명식적으로 data, method 가 정의된다.
    const { memberInfo, getMemberInfo } = useMemberInfo()

    onMounted(() => {
      console.log(memberInfo.value)
    })

    return { memberInfo, getMemberInfo }
  },
}
```

`mixin`

```javascript
// mixin.js
export const memberInfoMixin = () => {
  data() {
    return {
      memberInfo: {
        email: '',
        nickName: '',
        phoneNumber: '',
      }
    }
  },
  methods: {
    getMemberInfo() {
      // 멤버 정보 조회 API 호출
    }
  },
  created() {
    getMemberInfo()
  }
}

// Component.vue
import { memberInfoMixin } from './mixin'

export default {
  mixins: [memberInfoMixin],
  data() {
	  return {
		  // mixin 내에 암시적으로 data, method 가 정의된다.
		  memberInfo: null // ❗️ 코드 충돌
	  }
  },
  created() {
	// mixin life cycle hook이 먼저 호출되기 때문에 this.memberInfo 는 null 이다.
    console.log(this.memberInfo); // null
  }
}
```

<br>

## Mixin을 Composition API 로 교체하기

믹스인 사용하는 방식은 회사의 컨벤션에 따라 다릅니다. 이 전 회사에서는 믹스인이 여러곳에서 재사용할 수 있다는 장점을 이용해 유틸리티성 함수까지 믹스인에 작성되어있었습니다. 하지만 600 라인이 넘어가는 믹스인 파일들과 this의 출처를 추적하기 불편함을 느끼고 기존 팀원들에게 제 생각을 공유하여 점진적으로 리팩터링하기로 결정했습니다.

마침 vue3 마이그레이션을 진행 중이기도 해서, Composition API로의 교체까지 고려하여 리팩터링 단계를 작성했습니다.

<br />
**메서드의 역할 분리**

첫번째 단계로 믹스인의 믹스인내의 메서드들의 역할을 구분했습니다.

- 유틸리티성 메서드
- 도메인 로직과 연관된 메서드
- Options API를 포함한 메서드

위와 같은 역할의 메서드를 분리하여 아래와 같이 분리 작업을 진행했습니다.

- 유틸리티성 메서드 -> /utils 폴더로 이동
- 도메인 로직과 연관된 메서드 -> /features 폴더 추가 후 이동
- Options API를 포함한 메서드 -> 추후 Vue3 마이그레이션 시 Composition API로 교체

위와 같은 방식으로 점차적으로 믹스인 함수를 걷어내고, 각 관심사에 맞게 구조를 변경해나갔습니다.
당연히 믹스인을 보존하거나, Composition API로 교체하거나, 또 다른 방식으로 리팩터링하는 방법이 있을 것입니다. 팀원들과 충분한 논의를 통해 알맞은 방법을 선택해나가야합니다.

<br>
<br>

## 참고

- [You Shouldn’t be Using Mixins in Vue.js Anymore](https://javascript.plainenglish.io/you-shouldnt-be-using-mixins-in-vue-js-anymore-ec8c09824f9f)
- [Vue.js](https://ko.vuejs.org/guide/reusability/composables#comparisons-with-other-techniques)
- [Vue.js Mixins and Composition API: Advanced Code Reusability](https://codedamn.com/news/vuejs/vuejs-mixins-composition-api-code-reusability)
