// 타입 UserRole 정의
type UserRole = "admin" | "user";

// 첫 번째 클래스: 기본 클래스와 private 필드
class UserA {
  private _username: string;
  private _age: number;
  private _role: UserRole | undefined;

  constructor(username: string, age: number, role?: UserRole) {
    this._username = username;
    this._age = age;
    this._role = role;
  }

  public getUsername(): string {
    return this._username;
  }
}

const userA = new UserA("park", 30, "admin");
console.log(userA.getUsername()); // "park"

// 두 번째 클래스: 생성자 매개변수 속성
class UserB {
  constructor(
    private _username: string,
    private _age: number,
    public readonly role?: UserRole // readonly 속성 활용
  ) {}

  public getUsername(): string {
    return this._username;
  }
}

const userB = new UserB("kim", 30, "admin");
console.log(userB.getUsername()); // "kim"

// 세 번째 클래스: Getter와 Setter 사용
class UserC {
  constructor(private _username: string, private _age: number) {}

  get username(): string {
    console.log("Getting username...");
    return this._username;
  }

  set age(newAge: number) {
    if (newAge > 0) {
      this._age = newAge;
    } else {
      console.error("Age must be positive.");
    }
  }

  get age(): number {
    return this._age;
  }
}

const userC = new UserC("Oh", 30);

// Setter 호출
userC.age = 31;

// Getter 호출
console.log(userC.username); // "Getting username..." followed by "JHParrrk"
console.log(userC.age); // 31
