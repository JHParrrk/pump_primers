// 첫 번째 클래스: 기본 클래스와 private 필드
var UserA = /** @class */ (function () {
    function UserA(username, age, role) {
        this._username = username;
        this._age = age;
        this._role = role;
    }
    UserA.prototype.getUsername = function () {
        return this._username;
    };
    return UserA;
}());
var userA = new UserA("park", 30, "admin");
console.log(userA.getUsername()); // "park"
// 두 번째 클래스: 생성자 매개변수 속성
var UserB = /** @class */ (function () {
    function UserB(_username, _age, role // readonly 속성 활용
    ) {
        this._username = _username;
        this._age = _age;
        this.role = role;
    }
    UserB.prototype.getUsername = function () {
        return this._username;
    };
    return UserB;
}());
var userB = new UserB("kim", 30, "admin");
console.log(userB.getUsername()); // "kim"
// 세 번째 클래스: Getter와 Setter 사용
var UserC = /** @class */ (function () {
    function UserC(_username, _age) {
        this._username = _username;
        this._age = _age;
    }
    Object.defineProperty(UserC.prototype, "username", {
        get: function () {
            console.log("Getting username...");
            return this._username;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserC.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (newAge) {
            if (newAge > 0) {
                this._age = newAge;
            }
            else {
                console.error("Age must be positive.");
            }
        },
        enumerable: false,
        configurable: true
    });
    return UserC;
}());
var userC = new UserC("Oh", 30);
// Setter 호출
userC.age = 31;
// Getter 호출
console.log(userC.username); // "Getting username..." followed by "JHParrrk"
console.log(userC.age); // 31
