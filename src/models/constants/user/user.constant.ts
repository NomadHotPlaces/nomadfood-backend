export const USER = {
  EMAIL: {
    KR: '이메일',
    MIN_LENGTH: 5,
    MAX_LENGTH: 255,
    get REG_EXP(): RegExp {
      return new RegExp(
        `^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,${this.MAX_LENGTH}}$`,
      );
    },
  },

  PASSWORD: {
    KR: '비밀번호',
    MIN_LENGTH: 8,
    MAX_LENGTH: 255,
    // 8자 이상의 영문 대소문자, 숫자, 특수문자가 최소 1개 이상 포함된 비밀번호
    get REG_EXP(): RegExp {
      return new RegExp(
        `^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{${this.MIN_LENGTH},${this.MAX_LENGTH}}$`,
      );
    },
  },

  USERNAME: {
    KR: '닉네임',
    MIN_LENGTH: 2,
    MAX_LENGTH: 17,
    // 특수문자를 제외한 2자 이상 17자 이하의 영문, 숫자 또는 한글 닉네임
    get REG_EXP(): RegExp {
      return new RegExp(
        `^[a-zA-Z0-9가-힣]{${this.MIN_LENGTH},${this.MAX_LENGTH}}$`,
      );
    },
  },

  NAME: {
    KR: '이름',
    MIN_LENGTH: 2,
    MAX_LENGTH: 17,
    // 2자 이상, 17자 이하의 한글 이름
    get REG_EXP(): RegExp {
      return new RegExp(`^[가-힣]{${this.MIN_LENGTH},${this.MAX_LENGTH}}$`);
    },
  },

  PHONE: {
    KR: '연락처',
    MIN_LENGTH: 10,
    MAX_LENGTH: 11,
    // 01xxxxxxxxx 또는 01x-xxxx-xxxx 형식의 대한민국 휴대폰 번호 표준
    REG_EXP: /^01([0|1|6|7|8|9])[-]([0-9]{3,4})[-]([0-9]{4})$/,
  },

  ROLE: {
    KR: '권한',
    MAX_LENGTH: 5,
  },

  PROVIDER: {
    KR: 'OAuth 제공자',
    MAX_LENGTH: 20,
  },

  SNS_ID: {
    KR: '연동된 SNS 아이디',
  },
};
