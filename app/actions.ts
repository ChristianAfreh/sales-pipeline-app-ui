'use server'

import webpush from 'web-push'

// Configure VAPID details
webpush.setVapidDetails(
  'mailto:chrisprosper96@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

// Define the subscription type that matches web-push expectations
interface WebPushSubscription {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

// In-memory storage (use database in production)
let subscriptions: WebPushSubscription[] = []

export async function subscribeUser(subscription: any) {
  try {
    // Convert browser PushSubscription to web-push format
    const webPushSubscription: WebPushSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth
      }
    }
    
    // Remove existing subscription for this endpoint
    subscriptions = subscriptions.filter(
      sub => sub.endpoint !== webPushSubscription.endpoint
    )
    
    // Add new subscription
    subscriptions.push(webPushSubscription)
    
    console.log('User subscribed:', webPushSubscription.endpoint)
    return { success: true, message: 'Successfully subscribed to push notifications' }
  } catch (error) {
    console.error('Error subscribing user:', error)
    return { success: false, error: 'Failed to subscribe to push notifications' }
  }
}

export async function unsubscribeUser(endpoint: string) {
  try {
    subscriptions = subscriptions.filter(sub => sub.endpoint !== endpoint)
    console.log('User unsubscribed:', endpoint)
    return { success: true, message: 'Successfully unsubscribed from push notifications' }
  } catch (error) {
    console.error('Error unsubscribing user:', error)
    return { success: false, error: 'Failed to unsubscribe from push notifications' }
  }
}

export async function sendNotification(message: string, title: string = 'PWA Notification') {
  if (subscriptions.length === 0) {
    return { success: false, error: 'No active subscriptions' }
  }

  const notificationPayload = JSON.stringify({
    title,
    body: message,
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      url: '/',
      timestamp: Date.now()
    }
  })

  const results = await Promise.allSettled(
    subscriptions.map(async (subscription, index) => {
      try {
        await webpush.sendNotification(subscription, notificationPayload)
        return { success: true, index }
      } catch (error: any) {
        console.error(`Failed to send notification to subscription ${index}:`, error)
        
        // Remove invalid subscriptions
        if (error.statusCode === 410 || error.statusCode === 404) {
          subscriptions = subscriptions.filter(sub => sub.endpoint !== subscription.endpoint)
        }
        
        return { success: false, index, error: error.message }
      }
    })
  )

  const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length
  const failed = results.length - successful

  return {
    success: successful > 0,
    message: `Sent to ${successful} devices${failed > 0 ? `, failed for ${failed}` : ''}`,
    details: { successful, failed, total: results.length }
  }
}

export async function getSubscriptionCount() {
  return { count: subscriptions.length }
}