module.exports = function (plop) {
  plop.setGenerator("screen", {
    description: "Create a new screen",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the name of the screen:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/screens/{{pascalCase name}}.tsx",
        templateFile: "templates/ScreenTemplate.tsx",
      },
      // Adicione mais ações conforme necessário
    ],
  });

  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the name of the component:",
      },
      {
        type: "input",
        name: "props",
        message: "Enter the properties of the component (comma-separated):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}.tsx",
        templateFile: "templates/ComponentTemplate.tsx",
        skipIfExists: true,
      },
    ],
    // Transforma a string de propriedades em um array de objetos
    transformAnswers: function (answers) {
      if (answers.props) {
        const props = answers.props.split(",").map((prop) => {
          const [name, type] = prop.trim().split(":");
          return { name, type };
        });
        answers.props = props;
      }
      return answers;
    },
  });
};
