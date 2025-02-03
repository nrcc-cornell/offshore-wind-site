/* eslint-disable @typescript-eslint/no-explicit-any */
export const POST = async ({ request, platform }) => {
  try {
    if (request === undefined || platform === undefined) {
      throw { status: 500, message: 'Unknown server error' };
    }

    const { key }: {key: string} = await request.json();
    
    if (!key) {
      throw { status: 400, message: 'Bad Request' };
    }

    const object = await platform.env.r2_bucket.get(key);

    if (!object) {
      throw { status: 404, message: `Vital resource unavailable: "${key}"` };
    }

    const ext = key.split('.').slice(-1)[0];
    let data;
    if (ext === 'json') {
      data = await object.json();
      return new Response(JSON.stringify(data));
    } else if (ext === 'jpg' || ext === 'xlsx') {
      data = await object.blob();
      return new Response(data as unknown as any);
    }
  } catch (e: any) {
    console.error(e);
    const { status, message } = e;
    return new Response(JSON.stringify({ message: message || 'Unknown error: Check server logs' }), { status: status || 500 });
  }
};