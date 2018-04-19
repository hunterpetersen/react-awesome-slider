import React from 'react';
import PropTypes from 'prop-types';
import {
  classToModules,
  getClassName,
} from '../../helpers/components';

const ROOTELM = 'aws-frm';

export default class AwesomeFrame extends React.Component {
  static propTypes = {
    cssModule: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    rootElement: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    cssModule: null,
    children: null,
    className: null,
    title: null,
    rootElement: ROOTELM,
    disabled: false,
  };
  constructor(props) {
    super(props);
    this.rootElement = props.rootElement || ROOTELM;
    this.state = {
    };
  }

  getRootClassName() {
    const { rootElement } = this;
    const {
      cssModule,
      disabled,
    } = this.props;
    const className = [
      this.rootElement,
    ];
    if (disabled === true) {
      className.push(`${rootElement}--disabled`);
    }
    if (this.props.className) {
      className.push(...this.props.className.split(' '));
    }
    if (cssModule && cssModule[this.rootElement]) {
      return classToModules(className, cssModule);
    }
    return className.join(' ').trim().replace(/[\s]+/ig, ' ');
  }

  renderBar() {
    const {
      title,
      cssModule,
    } = this.props;
    return (
      <div
        ref={(container) => { this.container = container; }}
        className={getClassName(`${this.rootElement}__title-bar`, cssModule)}
      >
        <div className={getClassName(`${this.rootElement}__title-bar__controls`, cssModule)}>
          <span />
          <span />
          <span />
        </div>
        {title && (
          <p>
            {title}
          </p>
        )}
      </div>
    );
  }

  render() {
    const {
      children,
    } = this.props;
    return (
      <div
        className={this.getRootClassName()}
      >
        {this.renderBar()}
        {children}
      </div>
    );
  }
}
