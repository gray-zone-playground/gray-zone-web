/**
 * TODO: 백엔드 시드 데이터가 준비되면 이 파일을 삭제하고,
 * topic-api.ts에서 mock fallback 코드를 제거하세요.
 */
import { TopicStatus, type Topic } from '@/src/shared/types';

export const MOCK_TOPICS: Topic[] = [
  {
    id: 'mock-1',
    title: '친구가 시험에서 커닝하는 것을 목격했다. 선생님에게 알려야 할까?',
    optionGood: '정직하게 선생님에게 알린다',
    optionEvil: '친구의 비밀을 지켜준다',
    status: TopicStatus.VOTING,
    scheduledAt: new Date().toISOString(),
    closedAt: new Date(Date.now() + 3600_000).toISOString(),
    chatClosedAt: new Date(Date.now() + 7200_000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    title: '길에서 주운 지갑에 100만원이 들어있다. 어떻게 할 것인가?',
    optionGood: '경찰서에 신고한다',
    optionEvil: '그냥 가져간다',
    status: TopicStatus.SCHEDULED,
    scheduledAt: new Date(Date.now() + 86400_000).toISOString(),
    closedAt: new Date(Date.now() + 90000_000).toISOString(),
    chatClosedAt: new Date(Date.now() + 93600_000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];
