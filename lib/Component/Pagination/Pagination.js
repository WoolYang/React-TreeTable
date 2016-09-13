'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PageButton = require('./PageButton');

var _PageButton2 = _interopRequireDefault(_PageButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
	_inherits(Pagination, _Component);

	function Pagination(props) {
		_classCallCheck(this, Pagination);

		var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

		_this.startPage = 1;
		_this.finalStartPage = props.dataSize - props.paginationSize + 1;
		_this.lastPage = props.paginationSize;
		_this.center = Math.ceil(props.paginationSize / 2);
		return _this;
	}

	_createClass(Pagination, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var paginationSize = _props.paginationSize;
			var sizePageList = _props.sizePageList;
			var dataSize = _props.dataSize;
			var current = _props.current;
			var prevLabel = _props.prevLabel;
			var nextLabel = _props.nextLabel;
			var onPageChange = _props.onPageChange;
			var sizePerPage = _props.sizePerPage;

			var totalPages = Math.ceil(dataSize / sizePerPage);
			if (current > paginationSize - 1) {
				this.lastPage = Math.min(totalPages, current + paginationSize - this.center - 1);
				if (current > this.finalStartPage) {
					this.startPage = this.finalStartPage;
				} else if (this.lastPage - this.startPage !== paginationSize - 1) {
					this.startPage = current - this.center;
				}
			} else {
				this.startPage = 1;
				this.lastPage = Math.min(totalPages, paginationSize);
			}

			var PageButtons = [_react2.default.createElement(_PageButton2.default, {
				label: prevLabel, hidden: current === 1,
				key: 'prev', onClick: function onClick() {
					return onPageChange(current - 1, sizePerPage);
				} })];

			var _loop = function _loop(i) {
				var label = _this2.startPage + i;
				PageButtons.push(_react2.default.createElement(_PageButton2.default, { label: i, active: current === i, key: i, onClick: function onClick() {
						return onPageChange(i, sizePerPage);
					} }));
			};

			for (var i = this.startPage; i < this.lastPage + 1; i++) {
				_loop(i);
			}
			PageButtons.push(_react2.default.createElement(_PageButton2.default, {
				label: nextLabel, hidden: current === totalPages,
				key: 'next', onClick: function onClick() {
					return onPageChange(current + 1, sizePerPage);
				} }));
			return _react2.default.createElement(
				'ul',
				{ className: 'pagination' },
				PageButtons
			);
		}
	}]);

	return Pagination;
}(_react.Component);

exports.default = Pagination;


Pagination.propTypes = {
	paginationSize: _react.PropTypes.number,
	sizePerPage: _react.PropTypes.number,
	dataSize: _react.PropTypes.number,
	current: _react.PropTypes.number
};

Pagination.defaultProps = {
	current: 10,
	sizePerPage: 10,
	paginationSize: 6,
	prevLabel: _react2.default.createElement(
		'span',
		null,
		'«'
	),
	nextLabel: _react2.default.createElement(
		'span',
		null,
		'»'
	)
};