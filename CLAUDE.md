# Claude Code 규칙

## 기본 규칙

- 한국말로 대답할 것
- UI와 Business Logic을 분리할 것
- 최근 업데이트가 1년이 지난 패키지는 사용하지 않을 것

## Flutter 프로젝트 규칙

### 아키텍처

- Clean Architecture 원칙을 지킬 것 (Android Kotlin 프로젝트에도 동일 적용)

### 상태관리

- 상태관리는 Cubit을 사용할 것
- 가능한 Business Logic은 Cubit으로 분리할 것

### Cubit 구조

- Cubit 파일 기본 구조:

  ```dart
  // TEST_cubit.dart
  part 'TEST_cubit.freezed.dart';
  part 'TEST_state.dart';

  // TEST_state.dart
  part of 'TEST_cubit.dart';
  ```

  (TEST는 파일명)

- Cubit State의 class 앞에 반드시 `abstract`를 붙일 것

### 패키지

- 패키지를 추천할 때는 pub.dev를 참고할 것

### UI 구성

- UI 구성을 위한 private 메소드(`_buildXXX`)를 사용하지 말 것
- 대신 별도의 `StatelessWidget` 또는 `StatefulWidget`으로 분리할 것
- 각 위젯은 별도의 파일로 생성하고, 적절한 export 파일에 추가할 것

## Kotlin Android 프로젝트 규칙

### 1. 개요

- **언어**: Kotlin (1.9+)
- **UI**: Jetpack Compose (Material Design 3)
- **아키텍처**: MVVM (Model-View-ViewModel) + Clean Architecture (Data, Domain, Presentation Layers)
- **비동기 처리**: Kotlin Coroutines & Flow

## 2. 코드 스타일 및 관례 (Mandatory)

- **불변성**: `var` 대신 `val`을 기본으로 사용합니다.
- **Null Safety**: `!!` 연산자 사용을 금지합니다.
- **Data Model**: `data class`를 사용하고 불변 필드를 사용합니다.
- **ViewModel**: `StateFlow` 또는 `SharedFlow`를 사용하여 UI 상태를 관리합니다.
- **Compose**: 함수는 `@Composable`로 명시하고, State Hoisting을 준수합니다.
- **Naming**: 클래스는 PascalCase, 함수/변수는 camelCase, 리소스(xml)는 snake_case를 따릅니다.

## 3. 아키텍처 규칙

- **Domain Layer**: 비즈니스 로직(UseCase)을 포함하며 안드로이드 의존성이 없어야 합니다.
- **Data Layer**: Repository 구현, Data Source, API Service, Room DB 등을 포함합니다.
- **Presentation Layer**: ViewModel, UI 컴포저블을 포함합니다.
- **DI (Dependency Injection)**: **Hilt**를 사용합니다. `@HiltViewModel`, `@Inject`를 사용하세요.

## 4. Jetpack Compose 베스트 프랙티스

- Recomposition 최적화를 위해 `remember`, `derivedStateOf`를 적극 활용합니다.
- UI 상태는 `State<T>` 형태로 관리하고, Side-effect는 `LaunchedEffect` 또는 `SideEffect` 내에서 처리합니다.
- 무거운 로직은 Composable 함수 밖(ViewModel)에서 처리합니다.

## 5. 최신 Android 기술 스택

- **Networking**: Retrofit2 + OkHttp
- **Database**: Room
- **Image Loading**: Coil
- **Async**: Coroutines, Flow
- **Build**: Kotlin DSL (`build.gradle.kts`)

## 6. 에이전트 지침

- 새로운 기능을 구현할 때, **Domain -> Data -> Presentation** 순서로 모듈화하여 제안하세요.
- 코드를 작성하기 전에 필수 종속성이 `build.gradle.kts`에 포함되어 있는지 확인하세요.
- 파일 생성 시 관련 패키지 구조를 준수하세요.

## 7. 빌드/실행 명령어

- 빌드: `./gradlew assembleDebug`
- 테스트: `./gradlew test`

## React + Next.js 프로젝트 규칙

- FSD(Feature-Sliced Design) 아키텍처 원칙을 지킬 것
