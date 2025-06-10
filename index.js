/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

// Problem 1 - stripPrivateProperties
exports.stripPrivateProperties = (keywords = [], source = []) => {
  return source.map((item) => {
    return Object.keys(item).reduce((pre, cur) => {
      if (!keywords.includes(cur)) {
        pre[cur] = item[cur];
      }
      return pre;
    }, {});
  });
};

// Problem 2 - excludeByProperty
exports.excludeByProperty = (key = '', source = []) => {
  return source.filter((item) => !item.hasOwnProperty(key));
};

// Problem 3 - sumDeep
exports.sumDeep = (source = []) => {
  return source.map((item) => {
    return { objects: item.objects.reduce((prev, cur) => cur.val + prev, 0) };
  });
};

// Problem 4 - applyStatusColor
exports.applyStatusColor = (colorObj = {}, status = []) => {
  const statusToColorMap = new Map();
  Object.keys(colorObj).forEach((color) => {
    colorObj[color].forEach((it) => {
      statusToColorMap.set(it, color);
    });
  });

  return status
    .filter((it) => statusToColorMap.has(it.status))
    .map((it) => {
      return {
        ...it,
        color: statusToColorMap.get(it.status),
      };
    });
};

// Problem 5 - createGreeting
exports.createGreeting = (greetFn, keywords) => {
  return (msg) => greetFn(keywords, msg);
};

// Problem 6 - setDefaults
exports.setDefaults = (defaultObj) => {
  return (obj) => Object.assign({ ...defaultObj }, obj);
};

// Problem 7 - fetchUserByNameAndUsersCompany
exports.fetchUserByNameAndUsersCompany = (name, services) => {
  const fetchUserAndCompany = async () => {
    const users = await services.fetchUsers();
    const user = users.find((item) => item.name === name);
    const company = await services.fetchCompanyById(user.companyId);
    return { user, company };
  };

  return Promise.all([fetchUserAndCompany(), services.fetchStatus()])
    .then((res) => {
      const [userAndComponent, status] = res;
      return {
        user: userAndComponent.user,
        company: userAndComponent.company,
        status,
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
};
