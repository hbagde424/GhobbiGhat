# Quick Integration Guide for Premium Design

## How to Apply Premium Design to Any Page

### Step 1: Import Required Components
```tsx
import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
```

### Step 2: Add Background Effects
```tsx
<div className="min-h-screen bg-background relative overflow-hidden">
  {/* Interactive Grid Background */}
  <div className="absolute inset-0 opacity-20">
    <InteractiveGrid rows={10} cols={16} />
  </div>
  
  {/* Gradient Orbs */}
  <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
  
  {/* Your content here with relative z-10 */}
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Step 3: Replace Standard Components

#### Replace Card → GlassCard
**Before:**
```tsx
<Card className="p-6">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

**After:**
```tsx
<GlassCard className="p-6" hover glow>
  <h3 className="text-xl font-bold mb-4">Title</h3>
  <p>Content</p>
</GlassCard>
```

#### Replace Button → PremiumButton
**Before:**
```tsx
<Button variant="default" size="lg">
  Click Me
</Button>
```

**After:**
```tsx
<PremiumButton variant="premium" size="lg">
  Click Me
</PremiumButton>
```

### Step 4: Add Gradient Text to Headings
```tsx
<h1 className="text-5xl font-bold">
  Welcome to <span className="gradient-text">Your App</span>
</h1>
```

### Step 5: Add Glassmorphic Badges
```tsx
<GlassCard className="px-4 py-2 inline-flex items-center gap-2">
  <Icon className="h-4 w-4 text-primary" />
  <span className="text-sm font-medium">Badge Text</span>
</GlassCard>
```

### Step 6: Add Premium Icons with Glow
```tsx
<div className="relative inline-block">
  <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl group-hover:bg-primary/50 transition-all" />
  <div className="relative p-4 bg-gradient-to-br from-primary to-accent rounded-2xl">
    <Icon className="h-8 w-8 text-white" />
  </div>
</div>
```

## Common Patterns

### Hero Section
```tsx
<section className="relative min-h-screen flex items-center overflow-hidden">
  <div className="absolute inset-0 opacity-30">
    <InteractiveGrid rows={10} cols={16} />
  </div>
  
  <div className="relative max-w-7xl mx-auto px-4 z-10">
    <h1 className="text-7xl font-bold">
      Your <span className="gradient-text text-glow">Heading</span>
    </h1>
    <p className="text-xl text-muted-foreground">Description</p>
    <PremiumButton variant="premium" size="lg">Get Started</PremiumButton>
  </div>
</section>
```

### Stats Section
```tsx
<section className="py-20">
  <div className="grid grid-cols-4 gap-6">
    {stats.map((stat) => (
      <GlassCard className="p-8 text-center hover-lift shimmer" hover>
        <div className="text-5xl font-bold gradient-text">{stat.value}</div>
        <div className="text-sm text-muted-foreground">{stat.label}</div>
      </GlassCard>
    ))}
  </div>
</section>
```

### Feature Cards
```tsx
<GlassCard className="p-8 group gradient-border" hover glow>
  <div className="mb-6">
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
      <Icon className="relative h-12 w-12 text-primary" />
    </div>
  </div>
  <h3 className="text-xl font-bold mb-3">Feature Title</h3>
  <p className="text-muted-foreground">Feature description</p>
</GlassCard>
```

### CTA Section
```tsx
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
  <div className="absolute inset-0 opacity-20">
    <InteractiveGrid rows={8} cols={12} />
  </div>
  
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <GlassCard className="p-16" glow>
      <h2 className="text-5xl font-bold mb-6">
        Ready to <span className="gradient-text">Get Started?</span>
      </h2>
      <PremiumButton variant="premium" size="lg">Start Now</PremiumButton>
    </GlassCard>
  </div>
</section>
```

## Dashboard Pages Integration

### User Dashboard
```tsx
// Replace dashboard cards
<GlassCard className="p-6" hover>
  <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
  {/* Order list */}
</GlassCard>

// Replace action buttons
<PremiumButton variant="premium" onClick={handleNewOrder}>
  New Order
</PremiumButton>
```

### Vendor Dashboard
```tsx
// Stats cards
<div className="grid grid-cols-3 gap-6">
  <GlassCard className="p-6 hover-lift" hover>
    <div className="text-3xl font-bold gradient-text">₹12,450</div>
    <div className="text-sm text-muted-foreground">Today's Earnings</div>
  </GlassCard>
</div>

// Order table wrapper
<GlassCard className="p-6">
  <Table>
    {/* Table content */}
  </Table>
</GlassCard>
```

### Admin Dashboard
```tsx
// Metrics cards
<GlassCard className="p-6 gradient-border" glow>
  <div className="flex items-center justify-between">
    <div>
      <div className="text-2xl font-bold gradient-text">{metric.value}</div>
      <div className="text-sm text-muted-foreground">{metric.label}</div>
    </div>
    <Icon className="h-8 w-8 text-primary" />
  </div>
</GlassCard>
```

## Form Pages

### Auth Pages
```tsx
<div className="min-h-screen flex items-center justify-center relative overflow-hidden">
  <div className="absolute inset-0 opacity-20">
    <InteractiveGrid rows={10} cols={16} />
  </div>
  
  <GlassCard className="w-full max-w-md p-8" glow>
    <h2 className="text-3xl font-bold mb-6 text-center">
      <span className="gradient-text">Sign In</span>
    </h2>
    
    <form className="space-y-4">
      <Input placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <PremiumButton variant="premium" className="w-full">
        Sign In
      </PremiumButton>
    </form>
  </GlassCard>
</div>
```

### Profile Pages
```tsx
<div className="max-w-4xl mx-auto">
  <GlassCard className="p-8 mb-6" hover>
    <div className="flex items-center gap-6">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
        <Avatar className="relative h-24 w-24" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
    </div>
  </GlassCard>
  
  <GlassCard className="p-8">
    <h3 className="text-xl font-bold mb-6">Profile Settings</h3>
    {/* Form fields */}
    <PremiumButton variant="premium">Save Changes</PremiumButton>
  </GlassCard>
</div>
```

## Tips & Best Practices

1. **Use z-index properly**: Background effects should have lower z-index than content
2. **Don't overuse effects**: Not every element needs glow or gradient
3. **Maintain hierarchy**: Use gradient text for main headings only
4. **Performance**: Limit the number of blur effects on a single page
5. **Accessibility**: Ensure text contrast ratios meet WCAG standards
6. **Responsive**: Test on mobile devices and adjust opacity/blur as needed

## Color Usage Guidelines

- **Primary (Cyan)**: Main actions, links, important elements
- **Secondary (Purple)**: Accents, secondary actions
- **Accent (Blue)**: Highlights, special features
- **Gradient Text**: Hero headings, important stats, pricing
- **Glow Effects**: Icons, cards on hover, CTAs

## Animation Guidelines

- **Float**: Hero images, decorative elements
- **Shimmer**: Stats cards, feature cards
- **Pulse Glow**: CTAs, important buttons
- **Hover Lift**: All interactive cards
- **Gradient Shift**: Premium borders, special cards

## Next Pages to Update

1. ✅ Index (Home) - DONE
2. ✅ Services - DONE
3. ⏳ Vendors
4. ⏳ Auth (Login/Signup)
5. ⏳ User Dashboard
6. ⏳ Vendor Dashboard
7. ⏳ Admin Dashboard
8. ⏳ Order Pages
9. ⏳ Profile Pages
10. ⏳ CreateOrder

Simply follow the patterns above to maintain consistency across all pages!
