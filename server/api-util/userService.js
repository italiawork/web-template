const initiateIntegrationSdk = require('./initiateIntegrationSdk');

async function getUsers(page, perPage) {
  const integrationSdk = await initiateIntegrationSdk();

  const users = await integrationSdk.users.query({
    page,
    perPage,
  });

  const userData = users.data.data.length ? await Promise.all(users.data.data.map(async (user) => {
    const currentUser = await integrationSdk.users.show({
      id: user.id.uuid,
      include: 'profileImage',
    });

    return {
      image: currentUser?.data?.included && currentUser.data.included[0].attributes?.variants?.default?.url ? currentUser.data.included[0].attributes.variants.default.url : '',
      name: user.attributes.profile.displayName,
      url: `${process.env.REACT_APP_MARKETPLACE_ROOT_URL}/u/${user.id.uuid}`,
    };
  })) : [];

  return {
    items: userData,
    meta: users.data.meta,
  };
}

module.exports = { getUsers };
