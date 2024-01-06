# Git 커밋 메시지 가이드라인

## 커밋 메시지 구조

```
<타입>: <제목>
```

### 타입

- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor: 코드 리팩토링
- test: 테스트 코드, 리팩토링 테스트 코드 추가
- chore: 빌드 업무 수정, 패키지 매니저 수정

### 제목

- 제목은 50자를 넘기지 않고, 대문자로 작성하고 마침표를 붙이지 않습니다.
- 과거시제를 사용하지 않고 명령어로 작성합니다.
- 제목 첫글자를 동사로 시작합니다.

## 커밋 메시지 예시

```
feat: 로그인 기능 구현
```

```
fix: 로그인 버튼 누르면 죽는 버그 수정
```

```
docs: README.md 오타 수정
```

```
style: 코드 포맷팅 적용
```

```
refactor: Login API 문서 리팩토링
```

```
test: Login 서비스 로직 테스트 코드 추가
```

```
chore: package.json 버전 업데이트
```

## 참고

- [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/)
