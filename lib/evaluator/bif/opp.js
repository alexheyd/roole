'use strict';

var Node = require('../../node');
var RooleError = require('../../error');

module.exports = function(callNode) {
	var argumentListNode = callNode.children[1];
	if (!argumentListNode.children.length) {
		throw new RooleError('no arguments passed', callNode);
	}

	var argumentNode = argumentListNode.children[0];
	var argumentClone = Node.clone(argumentNode);

	if (argumentClone.type === 'list') {
		argumentClone.children[0] = toOppNode(argumentClone.children[0]);
		argumentClone.children[2] = toOppNode(argumentClone.children[2]);
		return argumentClone;
	}

	return toOppNode(argumentClone);
};

function toOppNode(node) {
	var pos = Node.toString(node);
	if (!pos || !(pos = toOppPos(pos))) {
		throw new RooleError('invalid position', node);
	}

	node.children[0] = pos;
	return node;
}

function toOppPos(pos) {
	switch(pos) {
	case 'left':
		return 'right';
	case 'right':
		return 'left';
	case 'top':
		return 'bottom';
	case 'bottom':
		return 'top';
	case 'center':
		return 'center';
	}
}