<?php
$video_items = array();
$initial_show = 10;
$load_more_count = 10;

if ( function_exists( 'get_field' ) ) {
    $videos_group = get_field( 'videos' );
    if ( is_array( $videos_group ) && ! empty( $videos_group['video'] ) && is_array( $videos_group['video'] ) ) {
        $video_items = $videos_group['video'];
    }
}
?>

<section id="videos" class="section" style="background:#f0f9f6">
    <div class="container">
        <div class="section-header fade-in">
            <span style="color:var(--primary);font-weight:700;letter-spacing:1px">ভিডিও গ্যালারি</span>
            <h2>বক্তব্য ও কার্যক্রম</h2>
            <div class="divider"></div>
        </div>

        <?php if ( ! empty( $video_items ) ) : ?>
            <div
                class="video-grid"
                id="videoGrid"
                data-initial-show="<?php echo esc_attr( $initial_show ); ?>"
                data-batch-size="<?php echo esc_attr( $load_more_count ); ?>">
                <?php foreach ( $video_items as $item ) :
                    $caption   = isset( $item['caption'] ) ? (string) $item['caption'] : '';
                    $link      = isset( $item['link'] ) ? (string) $item['link'] : '';
                    $thumbnail = $item['thumbnail'] ?? '';

                    $thumb_url = '';
                    if ( is_array( $thumbnail ) && ! empty( $thumbnail['url'] ) ) {
                        $thumb_url = $thumbnail['url'];
                    } elseif ( is_numeric( $thumbnail ) ) {
                        $thumb_url = wp_get_attachment_image_url( (int) $thumbnail, 'large' );
                    } elseif ( is_string( $thumbnail ) ) {
                        $thumb_url = $thumbnail;
                    }

                    if ( '' === $thumb_url ) {
                        $thumb_url = plugin_dir_url( __FILE__ ) . '../assets/speech.png';
                    }
                    ?>
                    <div class="video-card fade-in" data-embed="<?php echo esc_url( $link ); ?>" data-title="<?php echo esc_attr( $caption ); ?>">
                        <div class="video-thumb">
                            <img src="<?php echo esc_url( $thumb_url ); ?>" alt="<?php echo esc_attr( $caption ? $caption : 'Video Thumbnail' ); ?>">
                            <div class="play-btn"><span class="play-triangle"></span></div>
                        </div>
                        <div class="video-info">
                            <h3 style="font-size:1.1rem;color:var(--primary-dark)"><?php echo esc_html( $caption ); ?></h3>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <div style="text-align:center;margin-top:30px">
                <button id="videoLoadMoreBtn" class="btn btn-outline" type="button">আরও দেখুন</button>
            </div>
        <?php else : ?>
            <div style="max-width:760px;margin:0 auto;text-align:center;background:#fff;border:1px solid rgba(0,106,78,.12);border-radius:14px;padding:26px">
                <p style="color:var(--text-muted)">এখনও কোনো ভিডিও যোগ করা হয়নি। ACF এর <strong>videos</strong> গ্রুপে ভিডিও যুক্ত করুন।</p>
            </div>
        <?php endif; ?>
    </div>
</section>

<div id="videoOverlay" class="video-modal-overlay" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="videoModalTitle">
    <div class="video-modal">
        <div class="video-modal-header">
            <h3 id="videoModalTitle">ভিডিও</h3>
            <button id="videoModalClose" class="video-modal-close" type="button" aria-label="Close video">&times;</button>
        </div>
        <div class="video-frame-wrap">
            <iframe
                id="videoIframe"
                src=""
                title="Portfolio Video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
            </iframe>
        </div>
        <div id="videoNoLinkMessage" style="display:none;padding:24px;color:#d1d5db;text-align:center;font-size:1rem">
            No link in this video.
        </div>
    </div>
</div>
