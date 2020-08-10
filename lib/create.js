const inquirer = require('inquirer');
const VueCli = require('./VueCli.js');

module.exports = async function (name, options) {
    const inst = await getInstance(options);
    return await inst.run(name);
};

async function getInstance(options) {
    const template = await initTemplateList();
    if (template.type === 'vue') {
        return new VueCli(options, template);
    } else {
        console.log('暂无其他模板');
    }
}

async function initTemplateList() {
    const { template } = await inquirer.prompt({
        name: 'template',
        type: 'list',
        message: '选择一个模板',
        description: '',
        choices: [
            {
                value: {
                    description: 'vue 中台基础',
                    type: 'vue',
                    url: 'direct:git@github.com:MEDIOCAL/vue-cli-create-preset.git',
                    id: 'vue-admin'
                },
                name: "vue-admin: vue 中台基础"
            }, {
                value: {
                    description: 'vue 移动基础',
                    type: 'vue',
                    id: 'vue-mobile'
                },
                name: "vue-mobile: vue 移动基础"
            }
        ]
    });
    return template;
}
