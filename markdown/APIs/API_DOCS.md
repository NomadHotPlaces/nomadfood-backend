# API 설계

## 인증/인가

| CRUD                   | HTTP   | URI                 |
| ---------------------- | ------ | ------------------- |
| 회원가입               | POST   | `/api/auth/join`    |
| 로그인                 | POST   | `/api/auth/login`   |
| 로그아웃               | POST   | `/api/auth/logout`  |
| 회원탈퇴               | DELETE | `/api/auth/logout`  |
| 로그아웃               | POST   | `/api/auth/logout`  |
| 카카오 회원가입/로그인 | GET    | `/api/kakao`        |
| 카카오 OAuth 콜백      | GET    | `/api/kakao/oauth`  |
| 네이버 회원가입/로그인 | GET    | `/api/naver`        |
| 네이버 OAuth 콜백      | GET    | `/api/naver/oauth`  |
| Access 토큰 갱신       | GET    | `/api/auth/refresh` |

### 요청(Request)

```typescript
// 회원가입 양식
interface JoinForm {
  email: string;
  password: string;
  name: string;
  username: string;
}

// 로그인 양식
interface LoginForm {
  email: string;
  password: string;
}

// OAuth 요청 양식
interface OAuthRequest {
  email: string;
  name: string;
  provider: string;
  snsId: string;
}
```

### 응답(Response)

```typescript
// 로그인 응답
interface LoginResponse {
  accessToken: string;
}
```
