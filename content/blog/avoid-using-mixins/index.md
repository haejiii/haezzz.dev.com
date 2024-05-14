---
title: Mixin의 한계와 Composition API 도입
date: '2024-05-14 15:04:55'
description: '이번 글에서는 Vue.js 3에서 공식적으로 Mixins 사용을 지양하는 이유를 설명합니다.'
published: true
tags:
  - vue
  - mixin
---

# 믹스인(Mixin) 란?

믹스인(mixin)은 소프트웨어 개발 원칙 중 `DRY(Do not Repeat Yourself)` 원칙을 지키기 위해 만들어졌습니다. DRY의 개념은 중복배제로 `같은 정보의 중복을 지양하라` 입니다.

믹스인은 이러한 원칙을 통해 설계되어, 여러 컴포넌트 간에 동일한 기능을 분리하여 하나의 mixin 으로 공유할 수 있도록 합니다.

# Vue.js 3에서 믹스인 사용이 권장되지 않는 이유

이러한 믹스인은 겉으로 봤을땐 코드 재사용성과 확장성에 용이하다는 이점이 있지만, `근본적인 단점`이 존재합니다.

과도한 믹스인의 사용으로 인해 네임스페이스 충돌이 발생하고, 코드의 추적이 어려워질 수 있습니다. 또한 컴포넌트와 믹스인 사이에 동일한 라이프 사이클을 가졌을때, 둘 다 실행되기 때문에, 예측하지 못한 이슈가 발생할 수 있습니다.

vue3 공식문서 또한 이러한 문제를 들어 Mixin 을 지양하고, [Composition API 를 사용하라고 권장](https://ko.vuejs.org/guide/reusability/composables#comparisons-with-other-techniques)합니다.

**Mixin 사용을 지양해야하는 이유**

- 네이밍스페이스 충돌
- 암시적 mixin간의 충돌
- 불분명한 출처
- 예측하지 못한 사이드 이펙트 발생 우려

# Composition API의 등장

## Composition API 란?

Composition API는 Vue.js 3에서 도입된 새로운 API로, 기존 믹스인의 장점인 재사용성을 유지하며, 컴포넌트 로직을 더 유연한 코드 구조를 제공합니다.

## 믹스인과 Composition API 비교해보기

코드 재사용

- 믹스인은 컴포넌트 간에 코드를 공유하는 반면, Composition API는 함수를 통해 로직을 공유합니다.

코드 충돌

- 믹스인은 data, method의 이름과 life cycle hook 을 통해 충돌이 발생할 수 있고, Composition API는 함수의 스코프를 이용하기 때문에 이러한 이러한 문제를 방지합니다.

코드 구조화

- 믹스인은 컴포넌트의 옵션을(data, methods, life cycle hook) 기반으로 코드를 구조화하지만, Composition API는 로직(기능)을 기반으로 코드를 구조화합니다. 이로 인해 비슷한 관심사의 로직의 캡슐화와 응집도를 높일 수 있습니다.

불분명한 출처(명시성)

- 믹스인은 컴포넌트에 암시적으로 기능을 추가하는 반면, Composition API는 명시적으로 기능을 추가합니다. 이로 인해 로직이의 가독성이 향상되고, 로직을 쉽게 추적할 수 있습니다.

러닝 커브

- 믹스인은 기존 Vue.js 2에서 제공한 기능이며, 기존의 Vue.js 사용 경험이 있다면 쉽게 익힐 수 있다. Composition API는 Vue.js 3 새로운 개념과 패턴이여서 기존의 옵션 기반 AP에 익숙한 개발자들에게는 러닝 커브가 있을 수 있다. 하지만 요즘 React.js 를 기본적으로 학습하는 프론트엔드 개발자로써는 오히려 더 쉽게 다가올 수 있는 개념이라고 생각합니다.

따라서, Composition API는 믹스인의 이점을 유지하면서도 더욱 명확하고 유연한 코드 구조를 제공하므로, Vue.js 3에서는 믹스인 대신 Composition API 사용을 권장하고 있습니다.

# 코드를 통해 Mixin과 Composition API 살펴보기

**로그인한 멤버 정보 조회하는 API**

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
		  memberInfo: null // 코드 충돌!
	  }
  },
  created() {
	  // mixin life cycle hook이 먼저 호출되기 때문에 this.memberInfo 는 null 이다.
    console.log(this.memberInfo); // null!
  }
}
```

# Mixin을 Composition API 로 교체

회사마다 다르겠지만 편의성을 위해 mixin 내에 유틸리티성 함수도 작성하는 경우가 많은 것 같습니다. 제가 Composition API 로 점진적으로 개선한 방법을 공유합니다.

vue2 에서 vue3 로 마이그레이션하면서 먼저 Mixin 내의 유틸리티 함수를 분리합니다.

그 후 관심사별로 코드를 분리합니다. 그 후 Composition API로 변경할 코드를 속아냅니다. 도메인 로직과 관련된 서비스 로직 또는 life cycle hook 이 포함된 재사용 가능한 코드라고 한다면 Composition API로 작성합니다. 이 부분은 주관적일 수 있고, 회사마다 컨벤션이 다르기 때문에 팀의 규칙을 따르거나 현재 상황에 알맞은 컨벤션을 정해야합니다.

[참고]

[[Vue] Mixins은 왜 없어졌을까](https://velog.io/@vivala0519/Vue-Mixin을-왜-지양해야-할까)

[You Shouldn’t be Using Mixins in Vue.js Anymore](https://javascript.plainenglish.io/you-shouldnt-be-using-mixins-in-vue-js-anymore-ec8c09824f9f)

https://github.com/medit-frontend/platform-web/pull/508

[Vue.js](https://ko.vuejs.org/guide/reusability/composables#comparisons-with-other-techniques)

[Vue.js](https://ko.vuejs.org/guide/extras/composition-api-faq#comparison-with-react-hooks)

[Vue.js Mixins and Composition API: Advanced Code Reusability](https://codedamn.com/news/vuejs/vuejs-mixins-composition-api-code-reusability)
