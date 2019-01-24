import React, { createRef, Component } from 'react';

import styles from './contextmenu.module.scss';

class ContextMenu extends Component {
    contentRef = createRef()

    state = {
        visible: false,
    }

    _handleContextMenu = (event) => {
        event.preventDefault();

        this.setState({ visible: true  });

        const margin = 5;

        const {
            clientX: clickX,
            clientY: clickY
        } = event;

        const {
            innerWidth: screenW,
            innerHeight: screenH
        } = window;

        const {
            contentRef: {
                current: {
                    offsetWidth: rootW,
                    offsetHeight: rootH
                },
                current: contentRef
            }
        } = this;
        
        const right = (screenW - clickX) > rootW;
        if (right) {
            contentRef.style.left = `${clickX + margin}px`;
        }

        const left = !right;
        if (left) {
            contentRef.style.left = `${clickX - rootW - margin}px`;
        }

        const top = (screenH - clickY) > rootH;
        if (top) {
            contentRef.style.top = `${clickY + margin}px`;
        }

        const bottom = !top;
        if (bottom) {
            contentRef.style.top = `${clickY - rootH - margin}px`;
        }
    };

    _handleClick = (event) => {
        this.setState({ visible: false });   
    };

    _handleScroll = () => {
        this.setState({ visible: false });
    };
    
    componentDidMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
      document.removeEventListener('contextmenu', this._handleContextMenu);
      document.removeEventListener('click', this._handleClick);
      document.removeEventListener('scroll', this._handleScroll);
    }
    
    render() {
        if (!this.state.visible) {
            return null;
        }
        
        return(
            <div 
                ref={this.contentRef}
                className={styles.contextMenu}>
                {this.props.children}
            </div>
        )
    };
}

export default ContextMenu;