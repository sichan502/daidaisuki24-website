exports.handler = async function (event, context) {
  const sheet_id = process.env.SHEET_ID;
  const gid_preorder = process.env.GID_PREORDER;
  const gid_restocking = process.env.GID_RESTOCKING;
  const gid_coming_soon = process.env.GID_COMING_SOON;

  // You can restrict what gets sent to the frontend here
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Fetched secrets securely!",
      hasSecrets: !!(sheet_id && gid_preorder && gid_restocking && gid_coming_soon)
    })
  };
};
