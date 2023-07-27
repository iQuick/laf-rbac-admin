import dayjs from 'dayjs';
import { NAvatar } from 'naive-ui';
import { h } from 'vue';

export const columns = [
  {
    title: '用户名',
    key: 'username',
    width: 140,
  },
  {
    title: '昵称',
    key: 'nickname',
    width: 140,
  },
  {
    title: '头像',
    key: 'avatar',
    width: 140,
    render(row) {
      if (row.avatar && row.avatar.length) {
        return h(NAvatar, { src: row.avatar, round: true });
      }
      return h(NAvatar, { round: true });
    },
  },
  {
    title: '手机号',
    key: 'phone',
    width: 140,
  },
  {
    title: '邮箱',
    key: 'email',
    width: 140,
  },
  {
    title: '状态',
    key: 'status',
    width: 140,
    render(row) {
      return row.status === 0 ? '禁用' : '启用';
    },
  },
  {
    title: '创建时间',
    key: 'created_at',
    width: 200,
    render(row) {
      return dayjs(row.created_at).format('YYYY-MM-DD HH:mm');
    },
  },
];
