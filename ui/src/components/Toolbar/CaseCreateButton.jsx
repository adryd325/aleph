import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Button, Intent, Tooltip } from '@blueprintjs/core';

import CreateCaseDialog from 'src/dialogs/CreateCaseDialog/CreateCaseDialog';
import { selectSession } from 'src/selectors';

const messages = defineMessages({
  login: {
    id: 'case.create.login',
    defaultMessage: 'Please sign in first.',
  },
});


class CaseCreateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render() {
    const { intl, session } = this.props;
    if (!session.loggedIn) {
      return (
        <Tooltip content={intl.formatMessage(messages.login)}>
          <Button icon="folder-new" intent={Intent.PRIMARY} disabled>
            <FormattedMessage id="cases.index.create" defaultMessage="New dataset" />
          </Button>
        </Tooltip>
      );
    }
    return (
      <React.Fragment>
        <Button onClick={this.toggle} icon="folder-new" intent={Intent.PRIMARY}>
          <FormattedMessage id="cases.index.create" defaultMessage="New dataset" />
        </Button>
        <CreateCaseDialog
          isOpen={this.state.isOpen}
          toggleDialog={this.toggle}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ session: selectSession(state) });

CaseCreateButton = connect(mapStateToProps)(CaseCreateButton);
CaseCreateButton = injectIntl(CaseCreateButton);
export default CaseCreateButton;
