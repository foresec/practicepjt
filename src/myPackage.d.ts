// ts가 패키지(이 경우, js로 작성된 myPackage)를 인식할 수 있도록 모듈 선언
// 타입 지정

declare module "myPackage" {
	interface Config {
		url: string;
	}
  function init(config: Config): boolean;
  function exit(code: number): number;
}
