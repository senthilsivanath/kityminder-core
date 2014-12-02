
define(function(require, exports, module) {
    var kity = require('core/kity');
    var utils = require('core/utils');

    var Minder = require('core/minder');
    var MinderNode = require('core/node');
    var Command = require('core/command');
    var Module = require('core/module');

    var TextRenderer = require('./text');

    Module.register('basestylemodule', function() {
        var km = this;

        function getNodeDataOrStyle(node, name) {
            return node.getData(name) || node.getStyle(name);
        }

        TextRenderer.registerStyleHook(function(node, textGroup) {

            var fontWeight = getNodeDataOrStyle(node,'font-weight');
            var fontStyle = getNodeDataOrStyle(node, 'font-style');
            var styleHash = [fontWeight, fontStyle].join('/');

            textGroup.eachItem(function(index,item) {
                item.setFont({
                    'weight': fontWeight,
                    'style': fontStyle
                });
            });

        });
        return {
            'commands': {
                'bold': kity.createClass('boldCommand', {
                    base: Command,

                    execute: function(km) {

                        var nodes = km.getSelectedNodes();
                        if (this.queryState('bold') == 1) {
                            nodes.forEach(function(n) {
                                n.setData('font-weight').render();
                            });
                        } else {
                            nodes.forEach(function(n) {
                                n.setData('font-weight', 'bold').render();
                            });
                        }
                        km.layout();
                    },
                    queryState: function() {
                        var nodes = km.getSelectedNodes(),
                            result = 0;
                        if (nodes.length === 0) {
                            return -1;
                        }
                        nodes.forEach(function(n) {
                            if (n && n.getData('font-weight')) {
                                result = 1;
                                return false;
                            }
                        });
                        return result;
                    }
                }),
                'italic': kity.createClass('italicCommand', {
                    base: Command,

                    execute: function(km) {

                        var nodes = km.getSelectedNodes();
                        if (this.queryState('italic') == 1) {
                            nodes.forEach(function(n) {
                                n.setData('font-style').render();
                            });
                        } else {
                            nodes.forEach(function(n) {
                                n.setData('font-style', 'italic').render();
                            });
                        }

                        km.layout();
                    },
                    queryState: function() {
                        var nodes = km.getSelectedNodes(),
                            result = 0;
                        if (nodes.length === 0) {
                            return -1;
                        }
                        nodes.forEach(function(n) {
                            if (n && n.getData('font-style')) {
                                result = 1;
                                return false;
                            }
                        });
                        return result;
                    }
                })
            },
            commandShortcutKeys: {
                'bold': 'ctrl+b', //bold
                'italic': 'ctrl+i' //italic
            }
        };
    });
});