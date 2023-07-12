import cloud from '@lafjs/cloud';

const db = cloud.database();
const checkPermission = cloud.shared.get('checkPermission');

export async function main(ctx: FunctionContext) {
  // body, query 为请求参数, auth 是授权对象
  const { body, headers } = ctx;
  const { schemaId } = body;

  const token = headers['authorization'].split(' ')[1];
  const parsed = cloud.parseToken(token);
  const uid = parsed.uid;
  if (!uid) return { code: '401', error: '未授权访问' };

  // checkPermission
  const code = await checkPermission(uid, 'schema.read');
  if (code) {
    return 'Permission denied';
  }

  // get schema
  const { data: schema } = await db.collection('schema').doc(schemaId).get();

  if (!schema) return 'Schema is not exit';

  const collection = schema.collectionName;

  const r = await db.collection(collection).get();
  // console.log(r);

  return {
    code: 0,
    result: r.data,
  };
}
