import PropTypes from 'prop-types';
import '../../css/toast.css'

export const toast = ( container, value, icon ) => {
    
    const topContainer = document.querySelector( container );

    if ( icon === 'SUCCESS' ) {

        icon = { icon: 'check-circle', color: 'success'};

    }

    if ( icon === 'ERROR' ) {

        icon = { icon: 'exclamation-circle', color: 'danger'};

    }


        const alert = document.createElement('div');
        alert.innerHTML = `
            <div class="toast show animate__animated animate__fadeInDown" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex justify-content-center">
                    <div class="toast-body">
                    <i class="fas fa-${ icon.icon } px-1 text-${ icon.color }"></i> ${ value }
                    </div>
                </div>
            </div>`;

        if ( !document.querySelector('.toast') && topContainer ) {

            topContainer.append(alert);
            
            setTimeout(() => {
                // Check if toast container exists, if so remove it
                ( document.querySelector('.toast')) &&
                    document.querySelector('.toast').remove();
            }, 3000);

        }

        // Prevent api key url exposures
        // console.clear();
}

toast.propTypes = {
    container: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};
