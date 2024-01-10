// d.ts로 js패키지 type 지정 관련
import { init, exit } from "myPackage";

init({
  url: "true",
});

exit(1);


// allowJS(tsconfig.json) + JsDoc로 type 지정
// 단, 동일한 이름의 js와 d.ts파일이 있을 시 module을 못찾음...
// -> File '~/src/myPackage.d.ts' is not a module.ts(2306)
// 그래서 d.ts파일 자체의 이름을 바꿔줘야 오류가 없어짐
// import { init, exit } from "./myPackage";

// init({
//   debug: true, url: "true",
// });
